import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminrequestviewComponent } from './adminrequestview/adminrequestview.component';
import { BusinessinfoComponent } from './businessinfo/businessinfo.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestlistComponent } from './requestlist/requestlist.component';
import { RequestviewComponent } from './requestview/requestview.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulelistComponent } from './schedulelist/schedulelist.component';
import { SelectComponent } from './select/select.component';
import { SignupComponent } from './signup/signup.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "select" },
  { path: "home", component: HomeComponent },
  { path: "businessinfo", component: BusinessinfoComponent },
  // { path: "summary", component: SummaryComponent },
  { path: "confirmation", component: ConfirmationComponent },
  { path: "login", component: LoginComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "schedulelist", component: SchedulelistComponent },
  { path: "select", component: SelectComponent },
  { path: "requestlist", component: RequestlistComponent},
  { path: 'requestview', component: RequestviewComponent},
  { path: "admin", component: AdminComponent },
  { path:"adminrequestview",component:AdminrequestviewComponent},
  { path: "signup", component: SignupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash:true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
