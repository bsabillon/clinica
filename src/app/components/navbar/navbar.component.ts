import { Component, OnInit } from '@angular/core'
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";

import {InicioComponent} from "../users/inicio/inicio.component";
import {RegistroComponent} from "../users/registro/registro.component";
import {HomeComponent} from "../home/home.component";
import {auth} from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private router: Router) { }
  public app_name: string='Casa Abierta';
  public isLogged: boolean=false
  public  isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getCurrentUser();
    this.getAdminUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  getAdminUser(){
      this.authService.isAuth().subscribe(auth=>{
        if (auth){
          this.userUid = auth.uid;
          this.authService.isUserAdmin(this.userUid).subscribe(userRole =>{
            this.isAdmin= Object.assign({},userRole.roles).hasOwnProperty('admin');
          })
        }
      })
    }

  onLogout(){
    this.authService.logoutUser();
    this.router.navigate(['/user/inicio']);
  }
}
