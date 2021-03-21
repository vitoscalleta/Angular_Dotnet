import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  users: any;
  constructor(private client:HttpClient)
  {

  }

  ngOnInit(){
    this.users = this.client.get("https://localhost:5001/api/users/").subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

}
