// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './schools/schools.component';
import { ShuleDetailsComponent } from './schools/shule/shule-details/shule-details.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schools', component: SchoolsComponent },
  //{ path: 'schools/:id', component: ShuleDetailsComponent }, // Define a route with parameter for school details
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
];

export default routes;

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
