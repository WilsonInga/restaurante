import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'restaurant-list', component: RestaurantListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'user' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
