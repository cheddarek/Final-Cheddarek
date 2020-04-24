import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterForm} from '../models/registerForm';
import {User} from '../models/user';
import {LoginForm} from '../models/loginForm';
import {register} from 'ts-node';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers= new HttpHeaders({ 'Content-Type':  'application/json'});

  constructor(private host:HostService,
              private http:HttpClient) { }

  login(loginForm:LoginForm){
      return this.http.post(this.host.host+"/login", {
          "email"   :loginForm.email,
          "password":loginForm.password
        },
      {headers:this.headers,observe: 'response'});
  }
  regiter(registerForm:RegisterForm){
    return this.http.post(this.host.host+"/user",  {

        "first_name":registerForm.first_name,

        "last_name":registerForm.last_name,

        "email":registerForm.email,

        "contact":registerForm.contact,

        "municipality_id":registerForm.municipality_id,

        "password":registerForm.password

      } ,
      {headers:this.headers,observe: 'response'});
  }
  logout(){
    this.deleteLocalStorage()
  }

  saveToken(jwt){
    localStorage.setItem('token',jwt);
   // this.saveRole(jwt);
   // this.savePublicId(jwt);
  //  this.saveMunicipalityId(jwt);
  }

  loadToken(){
    return localStorage.getItem('token');
  }
  isTokenExpired(){
    const jwt=this.loadToken();
    if (!jwt)return true;
    const date = this.getTokenExpirationDate(jwt);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  getTokenExpirationDate(token: string): Date {
    let exp = JSON.parse(window.atob(token.split('.')[1])).exp;
    if (exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(exp);
    return date;
  }

  loadPublicID(){
    const jwt=this.loadToken();
    let publicId = JSON.parse(window.atob(jwt.split('.')[1])).public_id;
    return publicId;
  }
  getRole(){
    const jwt=this.loadToken();
    let role = JSON.parse(window.atob(jwt.split('.')[1])).user_type;

    return role;
  }
  loadMunicipalityId(){
    const jwt=this.loadToken();
    let municipality_id = JSON.parse(window.atob(jwt.split('.')[1])).municipality_id;
    return municipality_id;

  }

  deleteLocalStorage(){
    localStorage.removeItem('token');
  }
  /* saveMunicipalityId(jwt){
     let municipalityId = JSON.parse(window.atob(jwt.split('.')[1])).municipality_id;
     localStorage.setItem('municipality_id',municipalityId);
   }*/
  /*getRoleJwt(jwt){
    let role = JSON.parse(window.atob(jwt.split('.')[1])).user_type;
    console.log(role);
    return role ;
  }
  saveRole(jwt) {
    localStorage.setItem('ChedDarikrole',this.getRoleJwt(jwt));
  }*/

  /*  savePublicId(jwt){
      let publicId = JSON.parse(window.atob(jwt.split('.')[1])).public_id;
      localStorage.setItem('publicId',publicId);
    }*/

}
