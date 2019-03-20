import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../../services/auth.service";
import { UserInterface} from "../../../models/user";
import {User} from "firebase";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: UserInterface ={
   name: '',
    email: '',
    photoUrl: '',
    roles:{}
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user =>{
      if(user){
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    })
  }

}
