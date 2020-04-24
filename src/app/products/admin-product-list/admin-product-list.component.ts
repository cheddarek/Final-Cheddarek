import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {Category} from '../../models/category';
import {HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {ProduitService} from '../../services/produit.service';
import {Product} from '../../models/product';
import {AppToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  products:Product[]=[];
  public loading = false;
  constructor( public produitService:ProduitService,
    public toaster:AppToasterService) { 
      this.onGetProduct();
    }

  ngOnInit(): void {}
  onGetProduct(){
    this.loading =true;
    this.produitService.getProducts()
      .subscribe(
        (products:Product[])=>{
          this.products=products;
          console.log(products)},
        (err)=>{
          this.loading =false;
          console.log(err)
        },
        ()=>{
          this.loading =false;
          console.log("all products  are here");}
      )
  }
  onDeleteProduct(idproduct:number){
    this.loading =false;
    this.produitService.deleteProduct(idproduct)
      .subscribe(
        ()=>{},
        (err)=>{
          this.loading =false;
          this.toaster.lunchErrorToast("Vous ne pouvez pas supprimer ce produit","error");
          console.log(err);
        },
        ()=>{
          this.loading =false;
          this.onGetProduct();
          this.toaster.lunchSuccessToast("produit supprimé","sucess");

        }
      )
  }
}
