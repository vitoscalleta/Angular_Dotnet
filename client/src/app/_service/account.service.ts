import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/User';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:5001/api";
  private currentUserSource = new  ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable(); 

  constructor(private client:HttpClient) { }

  login(model:any){
   return this.client.post(this.baseUrl + "/account/login", model).pipe(
     map((user:User)=> {
       if(user)   
       {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        this.currentUserSource.next(user);
       }          
     })
   );   

  }

  register(model:any){
    return this.client.post(this.baseUrl+"/account/register",model).pipe(
      map((response : User)=>{
          localStorage.setItem('user', JSON.stringify(model));
          this.currentUserSource.next(response);
          return response;
      })
    )

  }

  logout()
  {
    localStorage.removeItem('user');    
    this.currentUserSource.next(null);
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
}
