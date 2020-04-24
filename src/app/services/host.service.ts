import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  public host:string ="http://punju.pythonanywhere.com";
  public products:string="http://punju.pythonanywhere.com";
  public category:string="http://punju.pythonanywhere.com/categories";
  public brande:string="http://punju.pythonanywhere.com/brands";
  constructor() { }
}
