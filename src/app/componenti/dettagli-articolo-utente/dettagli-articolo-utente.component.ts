import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-dettagli-articolo-utente',
  standalone: false,
  templateUrl: './dettagli-articolo-utente.component.html',
  styleUrls: ['./dettagli-articolo-utente.component.css'],
})
export class DettagliArticoloUtenteComponent {
  articolo: any;
  taglieIndumento: any[] = [];

  formTaglia!: FormGroup;

  showMessage = false;
  fadingOut = false; // 👈 per gestire il fade-out
  messageText = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private service: BackendService,
    private auth: AuthService,
    private carrelloService: CarrelloService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.body.classList.add('sfondo-dettagli-articolo');
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.service.getArticoloById(id).subscribe((resp: any) => {
        this.articolo = resp.dati ?? resp;

        if (
          this.articolo?.categoria?.nome?.toLowerCase() === 'running' ||
          this.articolo?.categoria?.nome?.toLowerCase() === 'scarpe'
        ) {
          // Scarpe
          this.formTaglia = this.fb.group({
            taglia: [
              '',
              [Validators.required, Validators.min(30), Validators.max(50)],
            ],
          });
        } else if (
          this.articolo?.tagliaIndumento !== null &&
          this.articolo?.tagliaIndumento !== undefined
        ) {
          // Indumenti
          this.service
            .getAllTaglieIndumento()
            .subscribe((t: any) => (this.taglieIndumento = t.dati));

          this.formTaglia = this.fb.group({
            taglia: ['', Validators.required],
          });
        } else {
          // 🔹 Articoli SENZA TAGLIA (es. occhialini, cuffie)
          this.formTaglia = this.fb.group({
            taglia: [null], // campo opzionale
          });
        }
      });
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-dettagli-articolo');
  }

  private showAnimatedMessage(text: string, type: 'success' | 'error') {
    this.messageText = text;
    this.messageType = type;
    this.showMessage = true;
    this.fadingOut = false;

    // dopo 2.5s parte il fade-out
    setTimeout(() => {
      this.fadingOut = true;
    }, 2500);

    // dopo 3.2s rimuovo il messaggio
    setTimeout(() => {
      this.showMessage = false;
      this.messageText = '';
    }, 3200);
  }

  onConferma(): void {
    const utenteId = this.auth.getUserId();
    if (!utenteId) {
      this.showAnimatedMessage(
        'Effettua il login per aggiungere al carrello!',
        'error'
      );
      return;
    }

    // 🔹 Se ha bisogno di taglia, ma non valida
    if (
      (this.articolo?.categoria?.nome?.toLowerCase() === 'running' ||
        this.articolo?.categoria?.nome?.toLowerCase() === 'scarpe' ||
        this.articolo?.tagliaIndumento !== null) &&
      this.formTaglia.invalid
    ) {
      this.showAnimatedMessage('Inserisci una taglia valida!', 'error');
      return;
    }

    const tagliaSelezionata = this.formTaglia.value.taglia ?? null;

    this.service
      .aggiungiAlCarrello(utenteId, this.articolo.id, tagliaSelezionata)
      .subscribe({
        next: (resp: any) => {
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
          this.showAnimatedMessage('Articolo aggiunto al carrello!', 'success');
        },
        error: () =>
          this.showAnimatedMessage('Errore aggiunta carrello', 'error'),
      });
  }
}
