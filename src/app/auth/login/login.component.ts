import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LoginForm} from '../../models/loginForm';
import {AppToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth:AuthService,
              private toaster:AppToasterService) { }

  ngOnInit(): void {
    this.initloginForm();

  }
  initloginForm() {
    this.loginForm = this.formBuilder.group({

      email:['',[Validators.required,Validators.email]],
      password: ['',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]

    });
  }
  onLogin() {
    let form= new LoginForm();
    form.email = this.loginForm.get('email').value;
    form.password = this.loginForm.get('password').value;
    this.loading =true;

    this.auth.login(form).subscribe(

        (res)=>{
          let jwt=res.body['token'];
          this.auth.saveToken(jwt);
          },
        (err) => {
          this.loading = false;
          console.log(err);
          this.toaster.lunchErrorToast("error with authentification","Access");
        },
        ()=>{
          this.loading = false;
          this.toaster.lunchSuccessToast("you are welcome","Access");
          this.choseNavigation();
        }
        );

  }


  choseNavigation(){
    let role:string=this.auth.getRole();
    console.log(role);
    switch (role){
      case "Admin":
        this.router.navigateByUrl("/admin/products");
        break;
      case "Client":
        this.router.navigateByUrl("/products");
        break;
      case "Municipality":
        this.router.navigateByUrl("/mcommande");
        break;
      case "Delivery_man":
        this.router.navigateByUrl("/delevery/commande");
        break;
      default:
        this.toaster.lunchErrorToast("can't get your account","Access");
        break;
    }


  }

}
