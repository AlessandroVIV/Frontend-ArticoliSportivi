import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  ordine = {
    nome: '',
    cognome: '',
    email: '',
    indirizzo: '',
  };

  carrello: any[] = [];
  totaleCarrello: number = 0;
  utente: any;

  constructor(
    private backend: BackendService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    document.body.classList.add('sfondo-checkout');
    this.utente = this.authService.getUser();

    if (this.utente) {
      this.ordine.nome = this.utente.nome;
      this.ordine.cognome = this.utente.cognome;
      this.ordine.email = this.utente.email;
    }

    const carrelloData = localStorage.getItem('carrello');
    this.carrello = carrelloData ? JSON.parse(carrelloData) : [];

    console.log('Carrello:', this.carrello);

    this.totaleCarrello = this.carrello.reduce(
      (tot, item) => tot + item.articolo.prezzo * item.quantita,
      0
    );
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-checkout');
  }

  confermaOrdine() {
    const ordinePayload = {
      totale: this.totaleCarrello,
      indirizzo: this.ordine.indirizzo,
      articoli: this.carrello.map((i) => ({
        articoloId: i.articolo.id,
        quantita: i.quantita,
        taglia: i.taglia,
      })),
      utenteId: this.utente.id,
    };

    this.backend.createOrdine(ordinePayload).subscribe({
      next: (resp) => {
        console.log('Ordine creato con successo', resp);
        this.router.navigate(['/ordine-confermato']);
      },
      error: (err) => console.error(err),
    });
  }
}
