import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CommandeService} from '../../services/commande.service';
import {Commande, ContentItem} from '../../models/commande';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:Commande=new Commande();
  quantity:number;
  public loading = false;
  constructor(public auth :AuthService,
              public commande :CommandeService) {

              this.loadcard();
  }

  ngOnInit(): void {
  }

  loadcard(){
    this.cart.total=this.commande.getCartPrice();
    this.cart.content=this.commande.get_cart();
    console.log("cart price :",this.cart.total);
    console.log(this.cart.content);
  }
  clearCart(){
    this.commande.delete_cart();
    this.loadcard();
  }
  deleteContentItem(contentItem:ContentItem){
    this.commande.delete_contentCart(contentItem);
    this.loadcard();
  }
  getTotal(){
    let price=0;
    let cart:ContentItem[]=this.cart.content;
    if (cart.length<0){return "0";}
    cart.forEach((content:ContentItem)=>{
      price=price+(parseFloat(content.price)*content.quantity);
    });
    this.cart.total=price.toString();
  }
  checkout(){
    this.loading=true;
    this.getTotal();
    this.commande.postCommande(this.cart).subscribe(
      (res)=>{},
      (err)=>{
        this.loading=false;
        console.log(err);},
      ()=>{
        this.loading=false;
        console.log("commande saved")}
    );
    this.commande.set_cart(this.cart.content);
  }
  parseFloat(total:any){

    return  Math.round(parseFloat(total) * 100) / 100
  }

}
