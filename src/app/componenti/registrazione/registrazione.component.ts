import { Component } from '@angular/core';
import { UtenteServiceService } from '../../services/utente-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css',
})
export class RegistrazioneComponent {

  msg: string = '';
  rc: boolean = true;

  ngOnInit() {
    document.body.classList.add('login-background');
  }

  ngOnDestroy() {
    document.body.classList.remove('login-background');
  }

  constructor(private utente: UtenteServiceService, private router: Router) {}

  onSubmit(signup: NgForm) {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(signup.form.value.email)) {
      this.rc = false;
      this.msg = 'Inserisci un indirizzo email valido!';
      return;
    }

    if (signup.form.value.password == signup.form.value.confirm)
      this.createUser(signup);
    else {
      this.rc = false;
      this.msg = 'Le passwords non corrispondono!';
    }

  }

  createUser(signup: NgForm) {
    this.utente
      .create({
        nome: signup.form.value.nome,
        cognome: signup.form.value.cognome,
        username: signup.form.value.username,
        password: signup.form.value.password,
        email: signup.form.value.email,
        role: 'USER',
      })
      .subscribe((resp: any) => {
        this.rc = resp.rc;
        if (resp.rc) {
          this.router.navigate(['/login']);
        } else this.msg = resp.msg;
      });
  }
  
}
