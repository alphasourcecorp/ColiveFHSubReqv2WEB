import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroMainComponent } from './hero-main/hero-main.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BusinessinfoComponent } from './businessinfo/businessinfo.component';
import { SummaryviewComponent } from './summaryview/summaryview.component';
import { HomeComponent } from './home/home.component';
import { PriceviewPipe } from './pipes/priceview.pipe';
import { MenuitemviewComponent } from './menuitemview/menuitemview.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxStickySidebarModule } from '@smip/ngx-sticky-sidebar';
import { LoginComponent } from './login/login.component';
import { SelectComponent } from './select/select.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulelistComponent } from './schedulelist/schedulelist.component';
import { CartvalueComponent } from './cartvalue/cartvalue.component';
import { AdminComponent } from './admin/admin.component';
import { RequestlistComponent } from './requestlist/requestlist.component';
import { RequestviewComponent } from './requestview/requestview.component';
import { AdminrequestviewComponent } from './adminrequestview/adminrequestview.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroMainComponent,
    FooterComponent,
    NavigationComponent,
    SummaryComponent,
    ConfirmationComponent,
    BusinessinfoComponent,
    SummaryviewComponent,
    HomeComponent,
    PriceviewPipe,
    MenuitemviewComponent,
    LoginComponent,
    SelectComponent,
    ScheduleComponent,
    SchedulelistComponent,
    CartvalueComponent,
    AdminComponent,
    RequestlistComponent,
    RequestviewComponent,
    AdminrequestviewComponent,
    SignupComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxStickySidebarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
