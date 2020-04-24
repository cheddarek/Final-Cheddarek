import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppToasterService} from '../../services/toaster.service';
import {CategoryService} from '../../services/category.service';

import { Category } from 'src/app/models/category';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth:AuthService,
              private toaster:AppToasterService,
              private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.initCategoryForm();

  }
  initCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(2)]],
    });
  }
  onAddCategory(){
    let form =new Category();
    form.name   = this.categoryForm.get('name').value;
    this.loading=true;
    this.categoryService.addCategory(form).subscribe(
      (data)=>{},
      (err)=>{this.toaster.lunchErrorToast("réessayez svp ","error")},
      ()=>{
        this.toaster.lunchSuccessToast("ajouté avec succées","sucess");
        this.loading=false;
      }
    )
  }

}
