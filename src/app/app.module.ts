// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'; // Import the routing module
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsdashboardComponent } from './components/newsdashboard/newsdashboard.component';

@NgModule({
  declarations: [],
  imports: [
    HomeComponent,
    DashboardComponent,
    NewsdashboardComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule // Import the routing configuration
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
