import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-gestisci-marca',
  standalone: false,
  templateUrl: './gestisci-marca.component.html',
  styleUrl: './gestisci-marca.component.css'
})
export class GestisciMarcaComponent {
  marche: any[] = [];
  marcaSelezionata: any = null;
  formVisibile = false;
  formAggiornamentoVisibile: boolean = false;
  formCreazioneVisibile: boolean = false;
  nuovaMarca: any = {};

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.caricaMarche();
  }

  caricaMarche(): void {
    this.backendService.getAllMarche().subscribe((response: any) => {
      this.marche = response.dati;
    });
  }

  mostraFormAggiornamento(marca: any) {
    this.formAggiornamentoVisibile = true;
    this.formCreazioneVisibile = false;
    this.marcaSelezionata = { ...marca };
  }

  mostraFormCreazione() {
    this.formCreazioneVisibile = true;
    this.formAggiornamentoVisibile = false;
    this.nuovaMarca = { nome: '' };
  }

  onSelectMarca(marca: any): void {
    this.marcaSelezionata = { ...marca }; // Copia dell’oggetto
    this.formVisibile = true; // Mostra form
  }

  tornaIndietro(): void {
    this.marcaSelezionata = null;
    this.formAggiornamentoVisibile = false;
    this.formCreazioneVisibile = false;
  }

  aggiornaMarca(): void {
    const body = { id: this.marcaSelezionata.id, nome: this.marcaSelezionata.nome };
    this.backendService.updateMarca(body).subscribe(() => {
      this.caricaMarche();
      this.tornaIndietro();
    });
  }

  creaMarca() {
    if (!this.nuovaMarca.nome) {
      alert("Inserisci il nome della marca!");
      return;
    }

    this.backendService.createMarca(this.nuovaMarca).subscribe({
      next: (res: any) => {
        alert(res.msg || "Marca creata con successo");
        this.formCreazioneVisibile = false;
        this.ngOnInit(); // Ricarica la tabella
      },
      error: (err) => {
        console.error(err);
        alert("Errore nella creazione della marca");
      }
    });
  }

  cancellaMarca(marca: any) {
    if (confirm(`Sei sicuro di voler cancellare la marca ${marca.nome}?`)) {
      this.backendService.removeMarca(marca).subscribe({
        next: (res: any) => {
          alert(res.msg || "Marca cancellata con successo");
          this.ngOnInit(); // ricarica la tabella
        },
        error: (err) => {
          console.error(err);
          alert("Errore nella cancellazione della marca");
        }
      });
    }
  }








}
