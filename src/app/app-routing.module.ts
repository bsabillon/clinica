import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import {ListJobsComponent} from "./components/admin/list-jobs/list-jobs.component";
import {HomeComponent} from "./components/home/home.component";
import {OfertasComponent} from "src/app/components/ofertas/ofertas.component";
import {Page404Component} from "./components/page404/page404.component";
import {InicioComponent} from "./components/users/inicio/inicio.component";
import {PerfilComponent} from "./components/users/perfil/perfil.component";
import {RegistroComponent} from "./components/users/registro/registro.component";
import {JobDetailsComponent} from "./components/job-details/job-details.component";
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ofertas', component: OfertasComponent, canActivate:[AuthGuard]},
  { path: 'job/:id', component: JobDetailsComponent, canActivate:[AuthGuard]},
  { path: 'admin/list-jobs', component: ListJobsComponent, canActivate: [AuthGuard] },
  { path: 'user/inicio', component: InicioComponent },
  { path: 'user/registro', component: RegistroComponent },
  { path: 'user/perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






