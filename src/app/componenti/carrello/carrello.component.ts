import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  items: any[] = [];
  msg = '';

  constructor(private service: BackendService, private auth: AuthService) { }

  ngOnInit(): void {
    document.body.classList.add('sfondo-carrello');
    const utenteId = this.auth.getUserId();
    if (!utenteId) {
      this.msg = 'Devi essere loggato per vedere il carrello!';
      return;
    }

    this.service.getCarrelloByUtente(utenteId).subscribe({
      next: (resp: any) => {
        console.log('Risposta carrello:', resp);
        this.items = resp.dati ?? resp;
        console.log('Items caricati:', this.items);
      },
      error: (err) => {
        console.error('Errore carrello:', err);
        this.msg = 'Errore nel recupero del carrello';
      },
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-carrello');
  }

  rimuoviItem(itemId: number) {
    const utenteId = this.auth.getUserId();

    if (!utenteId) {
      this.msg = 'Devi essere loggato per modificare il carrello!';
      return;
    }

    this.items = this.items.filter((i) => i.id !== itemId);

    this.service.rimuoviDalCarrello(utenteId, itemId).subscribe({
      next: () => {
        console.log(`Item ${itemId} rimosso correttamente`);
      },
      error: (err) => {
        console.error('Errore eliminazione:', err);
        this.msg = 'Errore eliminazione';
      },
    });
  }

  aumentaQuantita(itemId: number) {
    const utenteId = this.auth.getUserId();
    if (!utenteId) {
      this.msg = 'Devi essere loggato per modificare il carrello!';
      return;
    }

    this.service.aumentaQuantitaCarrello(utenteId, itemId).subscribe({
      next: (resp: any) => {
        const item = this.items.find(i => i.id === itemId);
        if (item) item.quantita += 1;
      },
      error: (err) => {
        console.error('Errore aumento quantità:', err);
        this.msg = 'Errore aumento quantità';
      }
    });
  }

  diminuisciQuantita(itemId: number) {
    const utenteId = this.auth.getUserId();
    if (!utenteId) {
      this.msg = 'Devi essere loggato per modificare il carrello!';
      return;
    }

    const item = this.items.find(i => i.id === itemId);
    if (!item || item.quantita <= 1) return; // blocco quantità minore di 1

    this.service.diminuisciQuantitaCarrello(utenteId, itemId).subscribe({
      next: (resp: any) => {
        if (item) item.quantita -= 1;
      },
      error: (err) => {
        console.error('Errore diminuzione quantità:', err);
        this.msg = 'Errore diminuzione quantità';
      }
    });
  }

  calcolaTotale(): number {
    return this.items.reduce((sum, item) => sum + item.articolo.prezzo * item.quantita, 0);
  }

  procediPagamento() {
    alert('Funzionalità di pagamento non implementata.');
  }
}
