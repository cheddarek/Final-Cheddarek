import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../services/commande.service';
import {Commande} from '../../models/commande';
import {AppToasterService} from '../../services/toaster.service';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent implements OnInit {
  commandes:Commande[]=[];
  public loading = false;

  constructor(public commandeService:CommandeService,
               private toaster:AppToasterService) {
    this.onGetCommandes();
  }

  ngOnInit(): void {
  }
  onGetCommandes(){
    this.loading = true;
    this.commandeService.getUserCommandes().subscribe
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
            this.commandeService.delete_cart();
            this.toaster.lunchSuccessToast("Commandes are here","Commandes");
          }
      );


  }

}
