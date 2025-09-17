import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ArticoliComponent } from './componenti/articoli/articoli.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { authGuard } from './auth/auth.guard';
import { AdminComponent } from './componenti/admin/admin.component';
import { DettagliArticoloComponent } from './componenti/dettagli-articolo/dettagli-articolo.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'articoli' , component: ArticoliComponent},
  {path: 'articoli' , component: ArticoliComponent},
  {path: 'dettagliArticolo/:id', component: DettagliArticoloComponent },  
  {path: 'login', component: LoginComponent},
  {path: 'registrazione', component: RegistrazioneComponent},
  {path: 'admin', component: AdminComponent },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
