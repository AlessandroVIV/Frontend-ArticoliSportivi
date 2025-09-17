import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ArticoliComponent } from './componenti/articoli/articoli.component';
import { LoginComponent } from './componenti/login/login.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'articoli' , component: ArticoliComponent},
  {path: 'login', component: LoginComponent},
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
