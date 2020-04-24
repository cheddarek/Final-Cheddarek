import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../auth.service';
import {AppToasterService} from '../toaster.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public toaster: AppToasterService) {
  }

  canActivate() {
    if ((this.auth.getRole() === "Client") && (!this.auth.isTokenExpired())) {
      return true;
    } else {
      this.router.navigate(['/login'], {});
      this.toaster.lunchErrorToast("your are not a Authorized", "error");
      return false;
    }
  }

}
