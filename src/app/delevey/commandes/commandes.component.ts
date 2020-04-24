import { Component, OnInit } from '@angular/core';
import {AppToasterService} from '../../services/toaster.service';
import {CommandeService} from '../../services/commande.service';
import {Commande} from '../../models/commande';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidateForm} from '../../models/validateForm';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  commandes:Commande[]=[];
  public loading = false;
  validateForm : FormGroup;
  constructor( private formBuilder: FormBuilder,
                private router: Router,
                public  commandeService:CommandeService,
                public  userService:UserService,
                private toaster:AppToasterService,
                private auth:AuthService,
                public route:Router) {
    this.onGetCommandes();

  }

  ngOnInit(): void {
    this.initDeliveryForm();
  }
  initDeliveryForm() {
    this.validateForm = this.formBuilder.group({
      id_commande: ['']
    });
  }
  onAssign() {
    let form= new ValidateForm();
    form.id_commande   = this.validateForm.get('id_commande').value;
    this.loading      = true;
    this.commandeService.confirmCommande(form)
      .subscribe(
      (res)=>{
        console.log("confirmé ! ");
        },
      (err) => {
        this.loading = false;
        console.log(err);
        this.toaster.lunchErrorToast("ne peut pas etre confirmé","assignement");
        console.log(form);
      },
      ()=>{
        this.loading = false;
        this.toaster.lunchSuccessToast("confirmé! merci à vous  ","assignement");
        
      }
      );
  }

  onGetCommandes(){
    this.loading = true;
    this.commandeService.getDeliveryManCommandes().subscribe
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
  onLogout(){
    this.auth.logout();
    this.route.navigateByUrl("/login")

  }
}
