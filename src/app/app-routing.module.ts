import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SecondComponent } from './components/second/second.component';
import { AdminComponent } from './components/admin/admin.component';
import { Role } from './shared/helpers';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SecondComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] },
  },
  {
    path: '** ',
    redirectTo: '',
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
