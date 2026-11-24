import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ResourcesComponent } from './resources/resources.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'resources', component: ResourcesComponent }
];
