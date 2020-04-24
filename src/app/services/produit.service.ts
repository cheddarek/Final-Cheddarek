import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HostService} from './host.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {Subject} from 'rxjs';
import {Payload} from '../models/productsPayload';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  public loading = false;
  payload:Payload;
  payloadSubject = new Subject<Payload>();
  loadingSubject= new Subject<boolean>();
  per_page:string="8";
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) {

  }
  emitPayload(){
    this.payloadSubject.next(this.payload)
  }

  getPayload(selector:string,pageNumber:number){
    this.loadingSubject.next(true);
    this.http.get<Payload>(this.host.products+selector+'/'+pageNumber.toString()+"/8",
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
      .subscribe(
      (payload:Payload)=>{

        console.log(payload);
        this.payload=payload;
        this.emitPayload();
       },
      (err)=>{
        console.log(err);
        this.loadingSubject.next(false);
      },
      ()=>{
        this.loadingSubject.next(false);
        console.log("all products  are here");
      }
    )
  }

  addProduct(product:Product){
    return this.http.post<Product>(this.host.products+"/products",product,{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }

  getSingleProduct(idProduct:number) {
    return this.http.get<Product>(this.host.products, {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }
  getProducts() {
    return this.http.get<Product[]>(this.host.products+"/productss", {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }


  deleteProduct(idProduct:number) {
    return this.http.delete<Product>(this.host.products +"/products/"+idProduct.toString(), {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }

  updateProduct(product:Product,idProduct:number){
    return this.http.post<Product>(this.host.products,product+"/products"+idProduct.toString(),{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }
}
