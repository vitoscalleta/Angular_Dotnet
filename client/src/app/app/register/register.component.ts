import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:any = {};
  @Output() cancelRegisterEvent= new EventEmitter();
  constructor(private accountService:AccountService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  registerUser(){
      this.accountService.register(this.user).subscribe(response => {
        console.log(response);
        this.cancelRegister();
      }, error => {
        this.toastrService.error(error.error);
      });
  }

  cancelRegister(){ 
    this.cancelRegisterEvent.emit(false);
  }

}
