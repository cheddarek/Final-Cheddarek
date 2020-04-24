import { Injectable } from '@angular/core';
import {HostService} from './host.service';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Commande, ContentItem} from '../models/commande';
import {AppToasterService} from './toaster.service';
import {ChooseForm} from '../models/chooseForm';
import { ValidateForm } from '../models/validateForm';

@Injectable({
  providedIn: 'root'
})

export class CommandeService {
  commandes:Commande[]=[];
  constructor(private host:HostService,
              private auth:AuthService,
              private http:HttpClient,
              private toaster:AppToasterService) {

  }
  getDeliveryManCommandes(){
    return this.http.get<Commande[]>(this.host.host+"/commande/delivery/"+this.auth.loadPublicID(),
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }


  getMunicipalityCommande(){
    return this.http.get<Commande[]>(this.host.host+"/commandes/municipality",
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }
  getMunicipalities(){
    return this.http.get<Municipality[]>(this.host.host+"/municipalities")
  }
  putCommande(chooseForm:ChooseForm){
    return this.http.put<Commande>(this.host.host+"/commande", {
      "id_delivery_man"   :chooseForm.id_delivery_man,
      "id_commande" : chooseForm.id_commande
    },
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }
  confirmCommande(validateForm:ValidateForm){
    return this.http.put<Commande>(this.host.host+"/commande/delivery", {
      "id_commande" : validateForm.id_commande
    },
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }
  getUserCommandes(){
    return this.http.get<Commande[]>(this.host.host+"/commande"+'/'+this.auth.loadPublicID(),
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }
  postCommande(cart:Commande){
    return this.http.post<Commande>(this.host.host+"/commande",{
      "id_client":this.auth.loadPublicID(),
      "total":cart.total,
      "content":cart.content
      },
      {headers:new HttpHeaders({'x-access-token':this.auth.loadToken()})})
  }

  get_cart():ContentItem[]{
    let cart:ContentItem[]=[];
    cart=JSON.parse(localStorage.getItem("cart"));
    if (cart ===null) {return []}
    else{    return JSON.parse(localStorage.getItem("cart"));
    }
  }
  set_cart(cart:ContentItem[]):ContentItem[]{
    localStorage.setItem("cart",JSON.stringify(cart));
    return cart ;
  }
  delete_cart(){
    localStorage.removeItem("cart");
  }

  delete_contentCart(contentItem:ContentItem){
    let cart:ContentItem[]=this.get_cart();
    let newCart:ContentItem[]=[];
    cart.forEach((content:ContentItem)=>{
      if(content.name===contentItem.name){}
      else newCart.push(content)
    });
    this.set_cart(newCart);
  }
  updateContentQuantity(contentItem:ContentItem,quantity:number){
    let cart:ContentItem[]=this.get_cart();
    cart.forEach((content:ContentItem)=>{
      if(content.name===contentItem.name){
        content.quantity=quantity;
      }
    });
    this.set_cart(cart);

  }
  addContent_to_cart(contentItem:ContentItem){
    let found:boolean=false;
    let cart:ContentItem[]=this.get_cart();
    cart.forEach((content:ContentItem)=>{
      if(content.name===contentItem.name){
        found=true;

        this.toaster.lunchSuccessToast("item aleady exist","sucess");
      }
    });
    if(!found){
      cart.push(contentItem);
      this.toaster.lunchSuccessToast("iteam added with sucess","sucess");
    }
    this.set_cart(cart);
  }
  getCartPrice():string{
    let price=0;

    let cart:ContentItem[]=this.get_cart();
    if (cart.length<0){return "0";}
    cart.forEach((content:ContentItem)=>{
        price=price+(parseFloat(content.price)*content.quantity);
    });

    return price.toString();
  }

}
export class Municipality{
  public name:string;
  public id:number;
  constructor() {

  }

}
