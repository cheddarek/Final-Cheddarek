import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../services/commande.service';
import {UserService} from '../services/user.service';
import {AppToasterService} from '../services/toaster.service';
import {Commande} from '../models/commande';
import {User} from '../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChooseForm} from '../models/chooseForm';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {
  commandes:Commande[]=[];
  chooseForm : FormGroup;
  public loading = false;
  users:User[]=[];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public  commandeService:CommandeService,
              public  userService:UserService,
              private toaster:AppToasterService,
              private auth:AuthService,
              public route:Router) {
    this.onGetCommandes();
    this.getDeliverymen();
  }
  getDeliverymen(){
    this.userService.getUsers().subscribe(
      (res:User[])=>{this.users=res;},
      (err) => {console.log(err)},
      ()=>{}
      
    )
  }

  ngOnInit(): void {
    this.initDeliveryForm();
  }
  initDeliveryForm() {
    this.chooseForm = this.formBuilder.group({
      id_delivery_man: [''],
      id_commande: ['']
  
    });
  }
  onAssign() {
    let form= new ChooseForm();
    form.id_delivery_man   = this.chooseForm.get('id_delivery_man').value;
    form.id_commande   = this.chooseForm.get('id_commande').value;
    this.loading      = true;
    this.commandeService.putCommande(form)
      .subscribe(
      (res)=>{
        console.log("assigné ! ");
        },
      (err) => {
        this.loading = false;
        console.log(err);
        this.toaster.lunchErrorToast("ne peut pas etre assigné","assignement");
        console.log(form);
      },
      ()=>{
        this.loading = false;
        this.toaster.lunchSuccessToast("assigné !!! ","assignement");
        console.log(form);
      }
      );
  }

  onLogout(){
    this.auth.logout();
    this.route.navigateByUrl("/login")

  }

  onGetCommandes(){
    this.loading = true;
    this.commandeService.getMunicipalityCommande().subscribe
    (
      (commandes:Commande[])=>{
        this.commandes=commandes;
        console.log(commandes);
      },
      (err) => {
        this.loading = false;
        console.log(err);
        this.toaster.lunchErrorToast("can't get commandes","Commandes");
      },
      ()=>{
        this.loading = false;
        this.toaster.lunchSuccessToast("Commandes are here","Commandes");
      }
    );


  }

}
