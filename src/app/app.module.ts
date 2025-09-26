import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { ArticoliComponent } from './componenti/articoli/articoli.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { AdminComponent } from './componenti/admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import { DettagliArticoloComponent } from './componenti/dettagli-articolo/dettagli-articolo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { DeleteArticoloComponent } from './dialogs/delete-articolo/delete-articolo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DettagliArticoloUtenteComponent } from './componenti/dettagli-articolo-utente/dettagli-articolo-utente.component';
import { GestisciMarcaComponent } from './componenti/gestisci-marca/gestisci-marca.component';
import { GestisciCategoriaComponent } from './componenti/gestisci-categoria/gestisci-categoria.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { CheckoutComponent } from './componenti/checkout/checkout.component';
import { RingraziamentiComponent } from './componenti/ringraziamenti/ringraziamenti.component';
import { StoricoOrdiniComponent } from './componenti/storico-ordini/storico-ordini.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticoliComponent,
    LoginComponent,
    NotfoundComponent,
    RegistrazioneComponent,
    AdminComponent,
    DettagliArticoloComponent,
    DeleteArticoloComponent,
    DettagliArticoloUtenteComponent,
    GestisciMarcaComponent,
    GestisciCategoriaComponent,
    CarrelloComponent,
    CheckoutComponent,
    RingraziamentiComponent,
    StoricoOrdiniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
