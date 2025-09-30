import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dettagli-articolo',
  standalone: false,
  templateUrl: './dettagli-articolo.component.html',
  styleUrl: './dettagli-articolo.component.css',
})
export class DettagliArticoloComponent {
  generi: any[] = [];
  marche: any[] = [];
  categorie: any[] = [];
  taglieIndumento: any[] = [];
  id!: number;
  articolo: any;
  msg = '';

  showModal = false;

  updateForm: FormGroup = new FormGroup({
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

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private routing: Router
  ) {}

  ngOnInit() {
    document.body.classList.add('sfondo-dettagli-articolo');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;

    this.backendService.getArticoloById(id).subscribe((data) => {
      this.articolo = data;

      this.updateForm.patchValue({
        nome: this.articolo.nome,
        descrizione: this.articolo.descrizione,
        prezzo: this.articolo.prezzo,
        marca: this.articolo.marca?.nome,
        genere: this.articolo.genere?.nome,
        categoria: this.articolo.categoria?.nome,
        tagliaScarpe: this.articolo.tagliaScarpe,
        tagliaIndumento: this.articolo.tagliaIndumento,
        urlImmagine: this.articolo.urlImmagine,
      });
    });

    this.backendService
      .getAllGeneri()
      .subscribe((d: any) => (this.generi = d.dati));
    this.backendService
      .getAllMarche()
      .subscribe((d: any) => (this.marche = d.dati));
    this.backendService
      .getAllCategorie()
      .subscribe((d: any) => (this.categorie = d.dati));
    this.backendService
      .getAllTaglieIndumento()
      .subscribe((d: any) => (this.taglieIndumento = d.dati));
  }

  ngOnDestroy() {
    document.body.classList.remove('sfondo-dettagli-articolo');
  }

  onSubmit() {
    const updateBody: any = {
      id: this.id,
      nome: this.updateForm.value.nome,
      descrizione: this.updateForm.value.descrizione,
      prezzo: this.updateForm.value.prezzo,
      genere: this.updateForm.value.genere,
      marca: this.updateForm.value.marca,
      categoria: this.updateForm.value.categoria,
      urlImmagine: this.updateForm.value.urlImmagine,
    };

    if (this.articolo?.tagliaScarpe !== null) {
      updateBody.tagliaScarpe = this.updateForm.value.tagliaScarpe;
    }

    if (this.articolo?.tagliaIndumento !== null) {
      updateBody.tagliaIndumento = this.updateForm.value.tagliaIndumento;
    }

    console.log('UpdateBody inviato:', updateBody);

    this.backendService.updateArticolo(updateBody).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin']).then(() => window.location.reload());
      } else {
        this.msg = resp.msg;
      }
    });
  }

  onDelete() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    this.backendService.removeArticolo(this.id).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin']).then(() => window.location.reload());
      } else {
        this.msg = resp.msg;
      }
    });
    this.closeModal();
  }

  onAnnul() {
    this.routing.navigate(['/admin']).then(() => {
      window.location.reload();
    });
  }
}
