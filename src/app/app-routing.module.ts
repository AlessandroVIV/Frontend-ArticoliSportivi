import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ArticoliComponent } from './componenti/articoli/articoli.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { AdminComponent } from './componenti/admin/admin.component';
import { DettagliArticoloComponent } from './componenti/dettagli-articolo/dettagli-articolo.component';
import { registerGuard } from './auth/auth.guard';
import { adminGuard } from './auth/admin-guard.guard';
import { DettagliArticoloUtenteComponent } from './componenti/dettagli-articolo-utente/dettagli-articolo-utente.component';
import { GestisciMarcaComponent } from './componenti/gestisci-marca/gestisci-marca.component';
import { GestisciCategoriaComponent } from './componenti/gestisci-categoria/gestisci-categoria.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'articoli', component: ArticoliComponent },
  { path: 'dettagli-articolo-utente/:id', component: DettagliArticoloUtenteComponent },
  { path: 'dettagliArticolo/:id', component: DettagliArticoloComponent, canActivate: [adminGuard] },  
  {path: 'creaMarca', component: GestisciMarcaComponent, canActivate: [adminGuard]},
  {path: 'creaCategoria', component: GestisciCategoriaComponent, canActivate: [adminGuard]},
  { path: 'login', component: LoginComponent, canActivate: [registerGuard] },
  { path: 'registrazione', component: RegistrazioneComponent, canActivate: [registerGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
