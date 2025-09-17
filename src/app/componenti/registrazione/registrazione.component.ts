import { Component } from '@angular/core';
import { UtenteServiceService } from '../../services/utente-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css'
})
export class RegistrazioneComponent {
  msg : string = '';
  rc : boolean = true;

  constructor(private utente:UtenteServiceService,
    private router:Router
  ){}
    onSubmit(signup:NgForm){
    if (signup.form.value.password == signup.form.value.confirm)
      this.createUser(signup);
    else {
      this.rc = false;
      this.msg = "le passwords non corrispondono";
    }

  }
  createUser(signup:NgForm) {
    this.utente.create({
      nome: signup.form.value.nome,
      cognome: signup.form.value.cognome,
      username : signup.form.value.username,
      password: signup.form.value.password,
      email: signup.form.value.email,
      role: 'USER'
    }).subscribe((resp:any) => {
      this.rc = resp.rc;
      if (resp.rc){
        this.router.navigate(["/login"])
      } else
        this.msg = resp.msg;
    })
 
  }
}