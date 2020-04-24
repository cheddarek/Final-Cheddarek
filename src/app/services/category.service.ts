import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Brand} from '../models/brand';
import {Subject} from 'rxjs';
import {Category} from '../models/category';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:Category[]=[];
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient) { }




  getCategories(){
    return this.http.get<Category[]>(this.host.category,
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})

  }

  addCategory(category:Category){
    return this.http.post<Category>(this.host.category,category,{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }

  getSingleCategory(idCategory:number) {
    return this.http.get<Category>(this.host.category+'/'+idCategory.toString() , {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }

  deleteCategory(idCategory:number) {
    return this.http.delete<Category>(this.host.category+'/'+idCategory.toString(), {
      headers: new HttpHeaders(
        {'x-access-token': this.auth.loadToken()})
    })
  }

  updateCategory(category:Category,idCategory:number){
    return this.http.post<Category>(this.host.category+'/'+idCategory.toString(),category,{headers:new HttpHeaders(
        {'x-access-token':this.auth.loadToken()})})
  }
}
