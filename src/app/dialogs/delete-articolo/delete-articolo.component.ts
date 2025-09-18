import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-articolo',
  standalone: false,
  templateUrl: './delete-articolo.component.html',
  styleUrl: './delete-articolo.component.css'
})
export class DeleteArticoloComponent {

  articolo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteArticoloComponent>) {
    if (data) {
      this.articolo = data.articolo;
    }
  }

  optionSelected(opt:string){
    this.dialogRef.close(opt);
  }

}
