import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
dataSource: any;

 articoli: any;
  response: any;

  constructor(private service: BackendService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    

    this.service.getArticoli().subscribe((resp) => {
      
      this.response = resp;
      this.articoli = this.response.dati;
      console.log(this.articoli);
    });

    
  }
}
