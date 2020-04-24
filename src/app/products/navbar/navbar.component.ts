import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {Category} from '../../models/category';
import {HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {MarqueService} from '../../services/marque.service';
import {Brand} from '../../models/brand';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories:Category[]=[];
  brands:Brand[]=[];
  @Output() selector =new EventEmitter<String>();
  constructor(public categoryService :CategoryService,
              public marqueService:MarqueService) {
    this.onGetCategories();
    this.onGetBrandes();
  }

  ngOnInit(): void {
  }

  onGetCategories(){
    this.categoryService.getCategories().subscribe(
        (categories:Category[])=>{
          this.categories=categories;
          console.log(categories)},
        (err)=>{console.log(err)},
        ()=>{console.log("all categories  are here");}
      )
  }
  onGetBrandes(){

   this.marqueService.getBrandes()
      .subscribe(
        (brands:Brand[])=>{
          this.brands=brands;
          console.log(brands)},
        (err)=>{
          console.log(err)
        },
        ()=>{console.log("all brands  are here");}
      )
  }

  selectSlector(choise){
    this.selector.emit(choise);
  }

}
