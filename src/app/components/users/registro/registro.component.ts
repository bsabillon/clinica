import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { AuthService} from "../../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/storage";
import {auth} from 'firebase/app';

import { finalize } from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService,
              private storage: AngularFireStorage) { }

  @ViewChild('imageUser') inputImaheUser: ElementRef;
  email = new FormControl('', [Validators.required, Validators.email]);
  public rEmail: string='';
  public  rPass: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes enviar un correo valido' :
      this.email.hasError('email') ? 'No es un correo valido' :
        '';
  }

  hide = true;
  ngOnInit() {
  }

  onLoginRedirect(): void{
    this.router.navigate(['ofertas']);
  }

  onUpload(e){
    //console.log('subir',e.target.file)
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
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

  onAddUser(){
    this.authService.registerUser(this.rEmail, this.rPass)
      .then((res)=> {
        this.authService.isAuth().subscribe( user=> {
          if(user) {
            user.updateProfile({
              displayName: '',
              photoURL: this.inputImaheUser.nativeElement.value
            }).then(() => {
              this.router.navigate(['ofertas']);
            }).catch((error) => console.log('error', error));
            }
        });
      }).catch(err=>console.log('err', err.message));
  }



}
