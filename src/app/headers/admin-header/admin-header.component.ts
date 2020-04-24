import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private auth:AuthService,
              public route:Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.auth.logout();
    this.route.navigateByUrl("/login")

  }

}
