import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-articoli',
  standalone: false,
  templateUrl: './articoli.component.html',
  styleUrl: './articoli.component.css',
})
export class ArticoliComponent {
  articoli: any;
  response: any;

  constructor(private service: BackendService) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    this.service.getArticoli().subscribe((resp) => {
      this.response = resp;
      this.articoli = this.response.dati;
      console.log(this.articoli);
    });
  }
}
