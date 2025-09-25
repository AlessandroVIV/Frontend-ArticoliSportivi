import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-dettagli-articolo-utente',
  standalone: false,
  templateUrl: './dettagli-articolo-utente.component.html',
  styleUrl: './dettagli-articolo-utente.component.css',
})
export class DettagliArticoloUtenteComponent {
  articolo: any;
  taglieIndumento: any[] = [];

  formTaglia!: FormGroup;

  msg = '';

  constructor(
    private route: ActivatedRoute,
    private service: BackendService,
    private auth: AuthService,
    private carrelloService: CarrelloService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.getArticoloById(id).subscribe((resp: any) => {
        this.articolo = resp.dati ?? resp;

        if (this.articolo?.tagliaIndumento !== null) {
          this.service
            .getAllTaglieIndumento()
            .subscribe((t: any) => (this.taglieIndumento = t.dati));

          // 👇 Form per indumenti (solo required)
          this.formTaglia = this.fb.group({
            taglia: ['', Validators.required],
          });
        }

        if (this.articolo?.tagliaScarpe !== null) {
          // 👇 Form per scarpe (required + range)
          this.formTaglia = this.fb.group({
            taglia: [
              '',
              [Validators.required, Validators.min(30), Validators.max(50)],
            ],
          });
        }
      });
    }
  }

  onConferma(): void {
    const utenteId = this.auth.getUserId();
    if (!utenteId) {
      this.msg = 'Effettua il login per aggiungere al carrello!';
      return;
    }

    if (this.formTaglia.invalid) {
      this.msg = 'Inserisci una taglia valida (tra 30 e 50)!';
      return;
    }

    const tagliaSelezionata = this.formTaglia.value.taglia;

    this.service
      .aggiungiAlCarrello(utenteId, this.articolo.id, tagliaSelezionata)
      .subscribe({
        next: (resp: any) => {
          this.msg = 'Articolo aggiunto al carrello!';

          const items = this.carrelloService.getItems();
          const existing = items.find(
            (i) => i.articolo.id === this.articolo.id
          );

          if (existing) {
            existing.quantita += 1;
          } else {
            items.push({
              id: resp?.id ?? Date.now(),
              articolo: this.articolo,
              quantita: 1,
            });
          }

          this.carrelloService.aggiornaItems([...items]);
        },
        error: () => (this.msg = 'Errore aggiunta carrello'),
      });
  }
}
