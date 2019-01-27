import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HistoryComponent } from './components/history/history.component';
import { SearchComponent } from './components/search/search.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    HistoryComponent,
    SearchComponent,
    AccountComponent,
    DashboardComponent,
    DetailUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
