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
  id!: number; // Declare but don't initialize
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
        nome: this.articolo.nome,
        descrizione: this.articolo.descrizione,
        prezzo: this.articolo.prezzo,
        marca: this.articolo.marca?.nome,
        genere: this.articolo.genere?.nome,
        categoria: this.articolo.categoria?.nome,
      });
    });
  }

  onSubmit() {
    const updateBody: any = {
      id: Number(this.route.snapshot.paramMap.get('id')),
    };

    if (this.updateForm.controls['descrizione'].touched)
      updateBody.descrizione = this.updateForm.value.descrizione;

    if (this.updateForm.controls['marca'].touched)
      updateBody.marca = this.updateForm.value.marca;

    if (this.updateForm.controls['nome'].touched)
      updateBody.nome = this.updateForm.value.nome;

    if (this.updateForm.controls['prezzo'].touched)
      updateBody.prezzo = this.updateForm.value.prezzo;

    if (this.updateForm.controls['genere'].touched)
      updateBody.genere = this.updateForm.value.genere;

    if (this.updateForm.controls['categoria'].touched)
      updateBody.categoria = this.updateForm.value.categoria;

    console.log(updateBody);

    this.backendService
      .updateArticoloScarpa(updateBody)
      .subscribe((resp: any) => {
        if (resp.rc) {
          this.routing.navigate(['/admin']).then(() => {
            window.location.reload();
          });
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
