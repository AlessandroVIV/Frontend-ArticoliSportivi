import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-articoli',
  standalone: false,
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.css',
})
export class ArticoliComponent {
  response: any;

  // Lista completa degli articoli
  articoli: any[] = [];

  // Lista filtrata che userai nel template
  articoliFiltrati: any[] = [];

  // Variabili per i filtri
  filtroNome: string = '';
  filtroMarca: string = '';
  filtroGenere: string = '';

  // Liste per menu a tendina
  marcheDisponibili: string[] = [];
  generiDisponibili: string[] = [];

  constructor(private service: BackendService) {}

  ngOnInit(): void {
    document.body.classList.add('sfondo-articoli');

    this.service.getArticoli().subscribe((resp: any) => {
      this.articoli = resp.dati;
      this.articoliFiltrati = [...this.articoli];

      this.marcheDisponibili = [...new Set(this.articoli.map((a) => a.marca))];
      this.generiDisponibili = [...new Set(this.articoli.map((a) => a.genere))];
    });
  }

  filtraArticoli(): void {
    console.log(
      'Filtra cliccato',
      this.filtroNome,
      this.filtroMarca,
      this.filtroGenere
    );
    this.articoliFiltrati = this.articoli.filter((articolo) => {
      console.log('Articolo genere:', articolo.genere);
      const matchNome = this.filtroNome
        ? articolo.nomeArticolo
            .toLowerCase()
            .includes(this.filtroNome.toLowerCase())
        : true;
      const matchMarca = this.filtroMarca
        ? articolo.marca === this.filtroMarca
        : true;
      const matchGenere = this.filtroGenere
        ? articolo.genere === this.filtroGenere
        : true;

      return matchNome && matchMarca && matchGenere;
    });
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-articoli');
  }

  resetFiltri(): void {
    this.filtroNome = '';
    this.filtroMarca = '';
    this.filtroGenere = '';

    // Ripristina la lista completa
    this.articoliFiltrati = [...this.articoli];
  }
}
