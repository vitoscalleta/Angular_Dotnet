import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './app/home/home.component';
import { RegisterComponent } from './app/register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemerDetailComponent } from './members/memer-detail/memer-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from './_modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemerDetailComponent,
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,    
    AppRoutingModule,
    SharedModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
