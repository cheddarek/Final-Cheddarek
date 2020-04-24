import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToasterService {

  constructor(private toastrService:ToastrService) { }


  lunchSuccessToast(message:string,title:string){
    this.toastrService.success(message,title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    })
  }
  lunchErrorToast(message:string,title:string){
    this.toastrService.error(message,title, {
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    })
  }
}
