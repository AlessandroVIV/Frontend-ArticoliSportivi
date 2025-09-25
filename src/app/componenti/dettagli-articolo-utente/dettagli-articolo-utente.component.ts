import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';
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

  formTaglia = new FormGroup({
    taglia: new FormControl(null),
  });

  msg = '';

  constructor(
    private route: ActivatedRoute,
    private service: BackendService,
    private auth: AuthService,
    private carrelloService: CarrelloService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.service.getArticoloById(id).subscribe((resp: any) => {
        console.log('Resp backend', resp);
        this.articolo = resp.dati ?? resp;

        if (this.articolo?.tagliaIndumento !== null) {
          this.service
            .getAllTaglieIndumento()
            .subscribe((t: any) => (this.taglieIndumento = t.dati));
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

    this.service.aggiungiAlCarrello(utenteId, this.articolo.id).subscribe({
      next: (resp: any) => {
        this.msg = 'Articolo aggiunto al carrello! ✅';

        const items = this.carrelloService.getItems();
        const existing = items.find((i) => i.articolo.id === this.articolo.id);

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
