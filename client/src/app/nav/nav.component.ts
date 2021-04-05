import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  baseUrl = "https://localhost:5001/api";  
  currentUser$;
  constructor(public accountService: AccountService, private router:Router, private toastrService:ToastrService) { 
    
  }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){   
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      console.log(response);
    }, error => {
      console.log(error);
      this.toastrService.error(error.error);
    });   
  }

  logout(){   
   this.accountService.logout();
   this.router.navigateByUrl('/');
  }

}
