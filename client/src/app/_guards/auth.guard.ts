import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_service/account.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastrService: ToastrService){  }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user)=>{
        if(user) return true;       
        this.toastrService.error("Unauthorized access");
      })
    );     
  }
}
