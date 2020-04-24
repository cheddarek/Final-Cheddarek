import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {Category} from '../../models/category';
import {HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {MarqueService} from '../../services/marque.service';
import {Brand} from '../../models/brand';
import {AppToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-marque-list',
  templateUrl: './marque-list.component.html',
  styleUrls: ['./marque-list.component.scss']
})
export class MarqueListComponent implements OnInit {
  brands:Brand[]=[];
  public loading = false;
  constructor( public marqueService:MarqueService,
               public toaster:AppToasterService) {
    this.onGetBrandes();}

  ngOnInit(): void {}
  onGetBrandes(){
    this.loading =true;
    this.marqueService.getBrandes()
      .subscribe(
        (brands:Brand[])=>{
          this.brands=brands;
          console.log(brands)},
        (err)=>{
          this.loading =false;
          console.log(err)
        },
        ()=>{
          this.loading =false;
          console.log("all brands  are here");}
      )
  }
  onDeleteBrande(idbrande:number){
    this.loading =true;
    this.marqueService.deleteBrande(idbrande)
      .subscribe(
        ()=>{},
        (err)=>{
          this.loading =false;
          this.toaster.lunchErrorToast("can't remove brande","error");
          console.log(err);
        },
        ()=>{
          this.loading =false;
          this.onGetBrandes();
          this.toaster.lunchSuccessToast("brande deleted","sucess");

        }
      )
  }

}
