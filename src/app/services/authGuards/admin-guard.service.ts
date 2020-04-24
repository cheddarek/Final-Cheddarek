import { Injectable } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router, CanActivate } from '@angular/router';
import {AppToasterService} from '../toaster.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public toaster: AppToasterService) {
  }

  canActivate() {
    if ((this.auth.getRole() === "Admin")&& (!this.auth.isTokenExpired())){
      return true;
    } else {
      this.router.navigate(['/login'], {});
      this.toaster.lunchErrorToast("your are not a admin","error");
      return false;
    }
  }
}
