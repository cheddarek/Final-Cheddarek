import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppToasterService} from '../../services/toaster.service';
import {MarqueService} from '../../services/marque.service';

import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.scss']
})
export class AddMarqueComponent implements OnInit {
  brandForm: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth:AuthService,
              private toaster:AppToasterService,
              private marqueService:MarqueService) { }

  ngOnInit(): void {
    this.initBrandForm();

  }
  initBrandForm() {
    this.brandForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(2)]],
    });
  }
  onAddBrand(){
    let form =new Brand();
    form.name   = this.brandForm.get('name').value;
    this.loading=true;
    this.marqueService.addBrande(form).subscribe(
      (data)=>{},
      (err)=>{this.toaster.lunchErrorToast("réessayez svp ","error")},
      ()=>{
        this.toaster.lunchSuccessToast("ajouté avec succées","sucess");
        this.loading=false;
      }
    )
  }

}
