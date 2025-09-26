import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-storico-ordini',
  standalone: false,
  templateUrl: './storico-ordini.component.html',
  styleUrl: './storico-ordini.component.css',
})
export class StoricoOrdiniComponent {
  ordini: any[] = [];

  constructor(
    private backend: BackendService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const utenteId = this.auth.getUser().id;

    this.backend.getOrdiniByUtente(utenteId).subscribe({
      next: (res: any) => {
        this.ordini = res;
        console.log("Ordini recuperati:", this.ordini);
      },
      error: (err) => {
        console.error("Errore recupero ordini:", err);
      }
    });
  }
}
