import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';

// Angular modules for HTTP requests and forms
import { HttpClientModule } from '@angular/common/http';  // Lisätty HTTP-kutsuja varten
import { FormsModule } from '@angular/forms';  // Lisätty ngModel-käyttöä varten
import { CommonModule } from '@angular/common';  // Lisätty CommonModule

// Standalone components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsdashboardComponent } from './components/newsdashboard/newsdashboard.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';  // Lisätty ChatboxComponent

@NgModule({
  declarations: [
    AppComponent  // Only AppComponent remains in declarations              #edit: muokkasin AppComponentista "standalonen", jotta sain verkkosivun paikallisesti toimimaan "ng serve" komennolla, myöhemmässä vaiheessa varmaankin muokattava takaisin.
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,  // Lisätty HTTP-kutsuja varten
    FormsModule,  // Lisätty ngModel-käyttöä varten
    CommonModule,  // Lisätty CommonModule
    HomeComponent,  // Lisätty standalone-komponentit imports-kohtaan
    DashboardComponent,
    NewsdashboardComponent,
    ChatboxComponent  // ChatboxComponent lisätty imports-osioon
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
