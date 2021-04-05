import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AccountService } from './_service/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  users: any;
  constructor(private client:HttpClient, private accountService: AccountService)
  {    

  }

  ngOnInit(){    
    this.setCurrentUser();
  }

  setCurrentUser()
  {
      const user:User = JSON.parse(localStorage.getItem("user"));
      this.accountService.setCurrentUser(user);
  }

}
