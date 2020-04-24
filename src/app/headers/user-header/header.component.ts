import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile:User=new User();

  constructor(public user:UserService,
              public auth:AuthService,
              public route:Router) {
     this.getProfile();
  }

  ngOnInit(): void {

  }
  onLogout(){
    this.auth.logout();
    this.route.navigateByUrl("/login")
  }
  getProfile(){
    this.user.getProfile().subscribe(
      (user:User)=>{
        this.profile=user;
        console.log(this.profile);
      },
      (err)=>{console.log(err)},
      ()=>{console.log("profile  is here")}
    )
  }

}
