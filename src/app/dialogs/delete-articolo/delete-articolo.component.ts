import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-delete-articolo',
  standalone: false,
  templateUrl: './delete-articolo.component.html',
  styleUrl: './delete-articolo.component.css',
})
export class DeleteArticoloComponent {
  articoli: any;
  response: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteArticoloComponent>,
    private service: BackendService
  ) {
    if (data) {
      this.articoli = data.articolo; 
    }
  }

  ngOnInit(): void {
    this.service.getArticoli().subscribe((resp) => {
      this.response = resp;
      this.articoli = this.response.dati;
      console.log(this.articoli);
    });
    console.log(this.articoli);
  }

  optionSelected(opt: string) {
    this.dialogRef.close(opt);
  }
}
