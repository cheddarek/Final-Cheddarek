import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Brand} from '../models/brand';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  brands:Brand[]=[];
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }



  getBrandes(){

    return this.http.get<Brand[]>(this.host.brande,
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})

  }

  addBrande(brand:Brand){
    return this.http.post<Brand>(this.host.brande,brand,{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }

  getSingleBrande(idBrande:number) {
    return this.http.get<Brand>(this.host.brande+'/'+idBrande.toString() , {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }

  deleteBrande(idBrande:number) {
    return this.http.delete<Brand>(this.host.brande+'/'+idBrande.toString(), {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }

  updateBrande(brand:Brand,idBrande:number){
    return this.http.post<Brand>(this.host.brande+'/'+idBrande.toString(),brand,{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }

}
