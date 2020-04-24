import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {RegisterForm} from '../../models/registerForm';
import {AppToasterService} from '../../services/toaster.service';
import {CommandeService, Municipality} from '../../services/commande.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public loading = false;
  public municipalities:Municipality[]=[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth:AuthService,
              private toaster:AppToasterService,
              private commandeService:CommandeService) {
    this.getMunicipalities();
  }

  ngOnInit(): void {
    this.initRegisterForm();

  }
  getMunicipalities(){
    this.commandeService.getMunicipalities().subscribe(
      (res:Municipality[])=>{this.municipalities=res},
      (err) => {console.log(err)},
      ()=>{console.log("all municipalities  are here")}
    )
  }
  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email:['',[Validators.required,Validators.email]],
      password: ['',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]
      ],
      municipality_id: [''],
      contact: [''],
   //   adresse:['']

    });
  }
  onRegister() {
    let form= new RegisterForm();

    form.first_name   = this.registerForm.get('first_name').value;
    form.last_name    = this.registerForm.get('last_name').value;
    form.email        = this.registerForm.get('email').value;
    form.password     = this.registerForm.get('password').value;
    form.municipality_id = this.registerForm.get('municipality_id').value;
    form.contact      = this.registerForm.get('contact').value;
    this.loading      = true;

    //   form.adresse =this.registerForm.get('adresse').value;
    this.auth.regiter(form)
      .subscribe(
      (res)=>{
        },
      (err) => {
        this.loading = false;
        console.log(err);
        this.toaster.lunchErrorToast("error with registration","registration");
      },
      ()=>{
        this.loading = false;
        this.toaster.lunchSuccessToast("account created","registration");
        this.router.navigateByUrl("/login");
      }
      );
  }

}
