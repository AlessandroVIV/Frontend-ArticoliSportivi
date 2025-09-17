import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtenteServiceService } from '../../services/utente-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg="";

  constructor(private utente: UtenteServiceService,
    private router: Router,
    private auth: AuthService
  ) {}

  onSubmit(signin: NgForm) {
    this.auth.resetAll();

    const payload = {
      user: signin.form.value.username,
      password: signin.form.value.password
    };

    console.log("Payload inviato:", payload);

    this.utente.signin({
      user: signin.form.value.username,
      password: signin.form.value.password
    }).subscribe((resp: any) => {
      console.log(resp);
      if (resp.logged) {
        console.log('utente logged.. role:' + resp.role);
        this.auth.setAuthentificated();
        this.msg="";
        if (resp.role == 'ADMIN') {
          this.auth.setAdmin();
        }
        this.router.navigate(['home']);
      } else {
        this.msg='user/password invalido';
      }
    })

  }

}
