import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }


  getProfile(){
   return this.http.get<User>(this.host.host+'/user/'+this.auth.loadPublicID(),
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }
  getUsers(){
    return this.http.get<User[]>(this.host.host+'/delivery/men',
       {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
   }
}

