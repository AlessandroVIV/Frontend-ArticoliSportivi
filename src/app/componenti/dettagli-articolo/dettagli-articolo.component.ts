import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteArticoloComponent } from '../../dialogs/delete-articolo/delete-articolo.component';

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
  id!: number;
  readonly dialog = inject(MatDialog);
  articolo: any;
  msg = '';

  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(),
    descrizione: new FormControl(),
    prezzo: new FormControl(),
    marca: new FormControl(),
    genere: new FormControl(),
    categoria: new FormControl(),
    tagliaScarpe: new FormControl(), // 👈 aggiunto
    tagliaIndumento: new FormControl(), // 👈 aggiu
  });

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private routing: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getArticoloById(id).subscribe((data) => {
      this.articolo = data;

      this.updateForm.patchValue({
        nome: this.articolo.nomeArticolo,
        descrizione: this.articolo.descrizione,
        prezzo: this.articolo.prezzo,
        marca: this.articolo.marca?.id,
        genere: this.articolo.genere?.id,
        categoria: this.articolo.categoria?.id,
      });
    });

    this.backendService
      .getAllGeneri()
      .subscribe((data: any) => (this.generi = data.dati));
    this.backendService
      .getAllMarche()
      .subscribe((data: any) => (this.marche = data.dati));
    this.backendService
      .getAllCategorie()
      .subscribe((data: any) => (this.categorie = data.dati));
  }

  onSubmitScarpa() {
    const updateBody: any = {
      id: this.id,
      nome: this.updateForm.value.nome,
      descrizione: this.updateForm.value.descrizione,
      prezzo: this.updateForm.value.prezzo,
      genere: this.updateForm.value.genere,
      marca: this.updateForm.value.marca,
      categoria: this.updateForm.value.categoria,
      tagliaScarpe: this.updateForm.value.tagliaScarpe,
      urlImmagine: this.articolo.urlImmagine,
    };

    console.log('UpdateBody inviato:', updateBody);

    this.backendService
      .updateArticoloScarpa(updateBody)
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.routing
            .navigate(['/admin'])
            .then(() => window.location.reload());
        } else {
          this.msg = resp.msg;
        }
      });
  }

  onSubmitIndumento() {
    const updateBody: any = {
      id: this.id,
      nome: this.updateForm.value.nome,
      descrizione: this.updateForm.value.descrizione,
      prezzo: this.updateForm.value.prezzo,
      genere: this.updateForm.value.genere,
      marca: this.updateForm.value.marca,
      categoria: this.updateForm.value.categoria,
      tagliaIndumento: this.articolo.tagliaIndumento,
      urlImmagine: this.articolo.urlImmagine,
    };

    console.log('UpdateBody inviato:', updateBody);

    this.backendService
      .updateArticoloIndumento(updateBody)
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.routing
            .navigate(['/admin'])
            .then(() => window.location.reload());
        } else {
          this.msg = resp.msg;
        }
      });
  }

  onDelete() {
    console.log('onDelete');
    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';

    const dialogRef = this.dialog.open(DeleteArticoloComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { articolo: this.articolo },
      restoreFocus: false,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp == 'si') this.onDeleteAction();
    });
  }

  onDeleteAction() {
    this.backendService.removeArticolo(this.id).subscribe((resp: any) => {
      if (resp.rc) {
        this.routing.navigate(['/admin']).then(() => window.location.reload());
      } else {
        this.msg = resp.msg;
      }
    });
  }
  onAnnul() {
    this.routing.navigate(['/admin']).then(() => {
      window.location.reload();
    });
  }
}
