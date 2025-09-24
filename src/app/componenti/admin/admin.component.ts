import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  generi: any[] = [];
  marche: any[] = [];
  categorie: any[] = [];
  taglieIndumento: any[] = [];
  showCreateForm: boolean = false;
  createType: 'indumento' | 'scarpa' | null = null;

  readonly TYPE_INDUMENTO = 'indumento';
  readonly TYPE_SCARPA = 'scarpa';

  msg = '';
  id!: number;
  articoli: any;
  response: any;

  createFormIndumento: FormGroup = new FormGroup({
    nomeArticolo: new FormControl(),
    descrizione: new FormControl(),
    prezzo: new FormControl(),
    marca: new FormControl(),
    genere: new FormControl(),
    categoria: new FormControl(),
    tagliaScarpe: new FormControl(),
    tagliaIndumento: new FormControl(),
    urlImmagine: new FormControl(),
  });

  createFormScarpa: FormGroup = new FormGroup({
    nome: new FormControl(),
    descrizione: new FormControl(),
    prezzo: new FormControl(),
    marca: new FormControl(),
    genere: new FormControl(),
    categoria: new FormControl(),
    tagliaScarpe: new FormControl(),
    tagliaIndumento: new FormControl(),
    urlImmagine: new FormControl(),
  });

  constructor(private service: BackendService, private routing: Router) {

  }

  ngOnInit(): void {
    console.log('ngOnInit');

    document.body.classList.add('sfondo-admin');
    this.service.getArticoli().subscribe((resp) => {
      this.response = resp;
      this.articoli = this.response.dati;
      console.log(this.articoli);
    });

    this.service
      .getAllGeneri()
      .subscribe((data: any) => (this.generi = data.dati));
    this.service
      .getAllMarche()
      .subscribe((data: any) => (this.marche = data.dati));
    this.service
      .getAllCategorie()
      .subscribe((data: any) => (this.categorie = data.dati));
    this.service
      .getAllTaglieIndumento()
      .subscribe((data: any) => (this.taglieIndumento = data.dati));
  }

  onSubmitIndumento() {
    const createBody: any = {
      nomeArticolo: this.createFormIndumento.value.nomeArticolo,
      descrizione: this.createFormIndumento.value.descrizione,
      prezzo: this.createFormIndumento.value.prezzo,
      genere: this.createFormIndumento.value.genere,
      marca: this.createFormIndumento.value.marca,
      categoria: this.createFormIndumento.value.categoria,
      urlImmagine: this.createFormIndumento.value.urlImmagine,
    };

    if (this.articoli?.tagliaScarpe !== null) {
      createBody.tagliaScarpe = this.createFormIndumento.value.tagliaScarpe;
    }

    if (this.articoli?.tagliaIndumento !== null) {
      createBody.tagliaIndumento = this.createFormIndumento.value.tagliaIndumento;
    }

    console.log('UpdateBody inviato:', createBody);

    this.service.createArticoloIndumento(createBody).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin']).then(() => window.location.reload());
      } else {
        this.msg = resp.msg;
      }
    });
  }

  onSubmitScarpa() {
    const createBody: any = {
      nome: this.createFormScarpa.value.nome,
      descrizione: this.createFormScarpa.value.descrizione,
      prezzo: this.createFormScarpa.value.prezzo,
      genere: this.createFormScarpa.value.genere,
      marca: this.createFormScarpa.value.marca,
      categoria: this.createFormScarpa.value.categoria,
      urlImmagine: this.createFormScarpa.value.urlImmagine,
    };

    if (this.articoli?.tagliaScarpe !== null) {
      createBody.tagliaScarpe = this.createFormScarpa.value.tagliaScarpe;
    }

    if (this.articoli?.tagliaIndumento !== null) {
      createBody.tagliaIndumento = this.createFormScarpa.value.tagliaIndumento;
    }

    console.log('UpdateBody inviato:', createBody);

    this.service.createArticoloScarpa(createBody).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin']).then(() => window.location.reload());
      } else {
        this.msg = resp.msg;
      }
    });
  }

  onAnnul() {
    this.showCreateForm = false;
    this.createType = null;
  };

  ngOnDestroy() {
    document.body.classList.remove('sfondo-admin');
  }
}

