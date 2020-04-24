import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {Category} from '../../models/category';
import {HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {MarqueService} from '../../services/marque.service';
import {Brand} from '../../models/brand';
import {AppToasterService} from '../../services/toaster.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories:Category[]=[];
  public loading = false;
  constructor( public categoryService:CategoryService,
               public toaster:AppToasterService) {
    this.onGetCategories();
  }

  ngOnInit(): void {
  }
  onGetCategories(){
    this.loading =true;
    this.categoryService.getCategories()
      .subscribe(
        (categories:Category[])=>{
          this.categories=categories;
          console.log(categories)},
        (err)=>{
          this.loading =false;
          console.log(err)
        },
        ()=>{
          this.loading =false;
          console.log("all categories  are here");}
      )
  }

  onDeleteCategory(category_id:number){
    this.loading =true;
    this.categoryService.deleteCategory(category_id)
      .subscribe(
        ()=>{},
        (err)=>{
          this.loading =false;
          this.toaster.lunchErrorToast("can't remove category","error");
          console.log(err);
        },
        ()=>{
          this.loading =false;
          this.onGetCategories();
          this.toaster.lunchSuccessToast("category deleted","sucess");

        }
      )
  }

}

