import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  registerMode = false;

  constructor() { }

  ngOnInit() {
  }

  RegisterMode(showHide:boolean){
    console.log("RegisterMode toggled");
    this.registerMode = showHide;
  }

}
