import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemerDetailComponent } from "./members/memer-detail/memer-detail.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";



const routes:Routes = [
{path:'', component:HomeComponent},
{
    path:'',
    runGuardsAndResolvers:'always',
    children: [
        {path:"messages",component:MessagesComponent, canActivate:[AuthGuard]},
        {path:"members", component:MemberListComponent},
        {path:"members/:id", component:MemerDetailComponent},
        {path:"lists", component:ListsComponent}
    ]
},
{path:"**",component:HomeComponent, pathMatch:'full'}
]

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports : [RouterModule]
})
export class AppRoutingModule {

}