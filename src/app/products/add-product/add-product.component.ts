import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppToasterService} from '../../services/toaster.service';
import {MarqueService} from '../../services/marque.service';
import {ProduitService} from '../../services/produit.service';
import { Product } from 'src/app/models/product';
import {Category} from '../../models/category';
import {HttpHeaders} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {Brand} from '../../models/brand';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories:Category[]=[];
  brands:Brand[]=[];
  @Output() selector =new EventEmitter<String>();
  public loading = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth:AuthService,
    private toaster:AppToasterService,
    private produitService:ProduitService,
    public categoryService :CategoryService,
    public marqueService:MarqueService) { 
      this.onGetCategories();
      this.onGetBrandes();
    }

  ngOnInit(): void {
    this.initProductForm();
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

  initProductForm() {
    this.productForm = this.formBuilder.group({
      name: [''],
      price: [''],
      stock: [''],
      image: [''],
      description: [''],
      category: [''],
      brand: [''],
    });
  }
  onAddProduct(){
    let form =new Product();
    form.name   = this.productForm.get('name').value;
    form.price   = this.productForm.get('price').value;
    form.stock   = this.productForm.get('stock').value;
    form.image   = this.productForm.get('image').value;
    form.description   = this.productForm.get('description').value;
    form.category_name   = this.productForm.get('category').value;
    form.brand_name   = this.productForm.get('brand').value;

    this.loading=true;
    this.produitService.addProduct(form).subscribe(
      (data)=>{},
      (err)=>{
        this.toaster.lunchErrorToast("réessayez svp ","error")
      console.log(form); },
      ()=>{
        this.toaster.lunchSuccessToast("ajouté avec succées","sucess");
        this.loading=false;
      }
    )
  }

}
