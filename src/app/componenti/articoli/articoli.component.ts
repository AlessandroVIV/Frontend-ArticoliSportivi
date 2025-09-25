import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articoli',
  standalone: false,
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.css',
})
export class ArticoliComponent {
  response: any;

  articoli: any[] = [];
  articoliFiltrati: any[] = [];

  filtroNome: string = '';
  filtroMarca: string = '';
  filtroGenere: string = '';

  marcheDisponibili: string[] = [];
  generiDisponibili: string[] = [];

  categoria: string | null = null; // 🔹 categoria dalla route

  constructor(
    private service: BackendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.body.classList.add('sfondo-articoli');

    // 1️⃣ Leggo categoria dalla route
    this.route.paramMap.subscribe((params) => {
      this.categoria = params.get('nome');

      // 2️⃣ Quando carico articoli, applico filtro categoria
      this.service.getArticoli().subscribe((resp: any) => {
        this.articoli = resp.dati;

        if (this.categoria) {
          this.articoliFiltrati = this.articoli.filter(
            (a) =>
              a.categoria &&
              a.categoria.toLowerCase() === this.categoria!.toLowerCase()
          );
        } else {
          this.articoliFiltrati = [...this.articoli];
        }

        this.marcheDisponibili = [
          ...new Set(this.articoli.map((a) => a.marca)),
        ];
        this.generiDisponibili = [
          ...new Set(this.articoli.map((a) => a.genere)),
        ];
      });
    });
  }

  filtraArticoli(): void {
    this.articoliFiltrati = this.articoli.filter((articolo) => {
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

      // 🔹 Se è stata scelta una categoria da route, mantienila
      const matchCategoria = this.categoria
        ? articolo.categoria?.toLowerCase() === this.categoria!.toLowerCase()
        : true;

      return matchNome && matchMarca && matchGenere && matchCategoria;
    });
  }

  resetFiltri(): void {
    this.filtroNome = '';
    this.filtroMarca = '';
    this.filtroGenere = '';

    this.articoliFiltrati = this.categoria
      ? this.articoli.filter(
          (a) =>
            a.categoria &&
            a.categoria.toLowerCase() === this.categoria!.toLowerCase()
        )
      : [...this.articoli];
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-articoli');
  }
}
