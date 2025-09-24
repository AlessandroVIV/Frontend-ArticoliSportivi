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

  constructor(private service: BackendService, private auth: AuthService) {}

  ngOnInit(): void {
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
}
