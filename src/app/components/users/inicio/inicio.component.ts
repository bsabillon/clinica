import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes enviar un correo valido' :
      this.email.hasError('email') ? 'No es un correo valido' :
        '';
  }

  hide = true;

 constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email1: string ='';
  public password: string = '';


  ngOnInit(): void {
  }

  onLoginRedirect(): void{
    this.router.navigate(['ofertas']);
  }

  onLogin():void{
   this.authService.loginEmailUser(this.email1, this.password)
     .then ( (res ) =>{
       this.onLoginRedirect();
     }).catch(err=> console.log('err', err.message));
  }

  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
      .then((res)=> {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err));

  }
  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
      .then( (res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err));
  }

  onLogout(){
   this.authService.logoutUser();
  }



}
