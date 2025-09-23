import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtenteServiceService } from '../../services/utente-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  msg = '';

  constructor(
    private utente: UtenteServiceService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    document.body.classList.add('login-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('login-background');
  }

  onSubmit(signin: NgForm) {
    
    this.auth.resetAll();

    const payload = {
      user: signin.form.value.username,
      password: signin.form.value.password,
    };

    console.log('Payload inviato:', payload);

    this.utente
      .signin({
        user: signin.form.value.username,
        password: signin.form.value.password,
      })
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.dati.logged) {
          console.log('utente logged.. role:' + resp.dati.role);
          this.auth.setAuthentificated();
          this.msg = '';
          if (resp.dati.role == 'ADMIN') {
            this.auth.setAdmin();
          }
          this.router.navigate(['home']);
        } else {
          this.msg = 'Username o password errati!';
        }
      });
  }
}
