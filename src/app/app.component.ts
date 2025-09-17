import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Frontend-ArticoliSportivi';

    constructor(public auth: AuthService, private router: Router) { }

    logout() {
      this.auth.resetAll();
      this.router.navigate(['login']); 
    }

}
