import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-gestisci-categoria',
  standalone: false,
  templateUrl: './gestisci-categoria.component.html',
  styleUrl: './gestisci-categoria.component.css'
})
export class GestisciCategoriaComponent {
  categorie: any[] = [];
  categoriaSelezionata: any = null;
  formAggiornamentoVisibile: boolean = false;
  formCreazioneVisibile: boolean = false;
  nuovaCategoria: any = {};

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.caricaCategorie();
    document.body.classList.add('sfondo-gestisci-categoria');
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-gestisci-categoria');
  }

  caricaCategorie(): void {
    this.backendService.getAllCategorie().subscribe((response: any) => {
      this.categorie = response.dati;
    });
  }

  mostraFormAggiornamento(categoria: any) {
    this.formAggiornamentoVisibile = true;
    this.formCreazioneVisibile = false;
    this.categoriaSelezionata = { ...categoria };
  }

  mostraFormCreazione() {
    this.formCreazioneVisibile = true;
    this.formAggiornamentoVisibile = false;
    this.nuovaCategoria = { nome: '' };
  }

  tornaIndietro(): void {
    this.categoriaSelezionata = null;
    this.formAggiornamentoVisibile = false;
    this.formCreazioneVisibile = false;
  }

  aggiornaCategoria(): void {
    const body = {
      id: this.categoriaSelezionata.id,
      nome: this.categoriaSelezionata.nome,
    };
    this.backendService.updateCategoria(body).subscribe(() => {
      this.caricaCategorie();
      this.tornaIndietro();
    });
  }

  creaCategoria(): void {
    if (!this.nuovaCategoria.nome) {
      return;
    }
    this.backendService.createCategoria(this.nuovaCategoria).subscribe({
      next: () => {
        this.formCreazioneVisibile = false;
        this.caricaCategorie();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancellaCategoria(categoria: any): void {
    if (confirm(`Sei sicuro di voler cancellare la categoria ${categoria.nome}?`)) {
      this.backendService.removeCategoria(categoria).subscribe({
        next: () => {
          this.caricaCategorie();
          this.tornaIndietro();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
