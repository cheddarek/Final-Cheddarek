import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProduitService} from '../../services/produit.service';
import {Payload} from '../../models/productsPayload';
import {Subscription} from 'rxjs';
import {pagination_details} from '../../models/pagination_detail';
import {Product} from '../../models/product';
import {CommandeService} from '../../services/commande.service';
import {Commande, ContentItem} from '../../models/commande';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
  payload:Payload;
  loading:boolean=false;
  curentPage:number=1;
  @Input()selector:string="/products";
  loadingSubscription: Subscription;
  PayloadSubscription: Subscription;
  pagination_details=new pagination_details(1,false,true);
  products:Product[]=[];



  constructor(public produitService:ProduitService,
              private readonly changeDetectionRef: ChangeDetectorRef,
              public commande:CommandeService) {

    this.EmitLoading();
    this.EmitPayload();
    this.onGetPayload(this.selector,this.curentPage);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.selector.currentValue!=changes.selector.previousValue){
      this.curentPage=1;
      this.onGetPayload(this.selector,this.curentPage);

    }

  }
  ngOnInit(): void {}

  EmitPayload(){
    this.PayloadSubscription = this.produitService.payloadSubject.subscribe(
      (payload: Payload) => {
        this.products = payload.product;
        this.pagination_details=payload.pagination_details;
        this.curentPage=this.pagination_details.page;
        this.changeDetectionRef.detectChanges();



      }
    );
  }

  EmitLoading(){
    this.loadingSubscription = this.produitService.loadingSubject.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      }
    );
  }

  onGetPayload(selector:string,pageNumber:number){
    this.produitService.getPayload(selector,pageNumber);
  }

  add_to_cart(product:Product){
    let commande =new ContentItem();
    commande.quantity=1;
    commande.price=product.price;
    commande.name=product.name+" "+product.brand_name;
    this.commande.addContent_to_cart(commande);
  }

  ngOnDestroy(){
    this.PayloadSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
