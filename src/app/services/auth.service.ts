import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import {reject} from "q";

import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {UserInterface} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email:string, pass: string){
    return new Promise (( resolve, reject) =>{
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err=> console.log(reject(err)));
    });
  }


  loginEmailUser(email1: string, password: string){
    return new Promise((resolve, reject) =>{
      this.afsAuth.auth.signInWithEmailAndPassword(email1,password)
        .then(userData => resolve(userData),
          err=> reject(err));
    });

  }



  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential=> this.updateUserData(credential.user))
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential=> this.updateUserData(credential.user))
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();

  }


  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id:user.uid,
      email:user.email,
      roles : {
        user:true
      }
    }
    return userRef.set(data,{merge:true})
  }

  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }

}
