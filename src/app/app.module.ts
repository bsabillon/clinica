import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatTabsModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInput,
  MatDialogModule, MatGridListModule,
} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/users/registro/registro.component';
import { InicioComponent } from './components/users/inicio/inicio.component';
import { PerfilComponent } from './components/users/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListJobsComponent,ModalComponent } from './components/admin/list-jobs/list-jobs.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { Page404Component } from './components/page404/page404.component';
import { environment } from '../environments/environment'


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {importType} from "@angular/compiler/src/output/output_ast";
import { JobDetailsComponent} from './components/job-details/job-details.component';



export const firebaseConfig = {
  apiKey: 'AIzaSyDgCzGX_0cEOUSoUOiaevafZUF9J6BvaUM',
  authDomain: 'casaabierta-bf4ff.firebaseapp.com',
  databaseURL: 'https://casaabierta-bf4ff.firebaseio.com',
  projectId: 'casaabierta-bf4ff',
  storageBucket: 'casaabierta-bf4ff.appspot.com',
  messagingSenderId: '299144327304'
};


@NgModule({
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioComponent,
    PerfilComponent,
    HomeComponent,
    NavbarComponent,
    ListJobsComponent,
    OfertasComponent,
    Page404Component,
    JobDetailsComponent,
    ModalComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,MatButtonModule, MatCheckboxModule,MatToolbarModule,MatTabsModule,MatIconModule,
    MatFormFieldModule,MatCardModule,MatSelectModule,MatInputModule,MatTableModule,MatPaginatorModule,MatSortModule,
    MatDialogModule,MatSelectModule,MatGridListModule,
    //MatInput,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
