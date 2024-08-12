import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define your routes
const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (com) => com.HomeComponent
      )
  },
  {
    path: 'dashboard/:industryName/:tableName',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (com) => com.DashboardComponent
      )
  },
  {
    path: 'newsdashboard',
    loadComponent: () =>
      import('./components/newsdashboard/newsdashboard.component').then(
        (com) => com.NewsdashboardComponent
      )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' // Match the full path for redirecting
  },
  {
    path: '**',
    redirectTo: 'home' // Wildcard route for handling unknown paths
  }
];

// Configure NgModule with RouterModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import RouterModule with routes
  exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule { }
