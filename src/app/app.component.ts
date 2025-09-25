import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CarrelloService } from './services/carrello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})


export class AppComponent {

  totaleArticoli = 0;

  ngOnInit(): void {
    this.carrelloService.items$.subscribe(items => {
      this.totaleArticoli = items.reduce((acc, item) => acc + item.quantita, 0);
    });
  }

  title = 'Frontend-ArticoliSportivi';

  constructor(public auth: AuthService, private router: Router, private carrelloService: CarrelloService) { }

  logout() {
    this.auth.resetAll();
    this.router.navigate(['login']);
  }

}
