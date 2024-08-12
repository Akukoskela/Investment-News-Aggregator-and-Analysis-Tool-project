import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';

// Assuming these are standalone components
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsdashboardComponent } from './components/newsdashboard/newsdashboard.component';

@NgModule({
  declarations: [
    AppComponent, // Add AppComponent to declarations
    // If HomeComponent, DashboardComponent, and NewsdashboardComponent are not standalone, add them here as well
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    // If these components are not standalone, remove them from imports
    HomeComponent,
    DashboardComponent,
    NewsdashboardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
