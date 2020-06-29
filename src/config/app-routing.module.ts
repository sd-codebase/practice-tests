import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '@pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '@pages/user/user-dashboard/user-dashboard.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { AdminAuthGuard } from 'src/auth/admin.auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [ AdminAuthGuard ],
    loadChildren: () => import('src/pages/admin/admin.pages.module').then(m => m.AdminPagesModule),
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [ AuthGuard],
    loadChildren: () => import('src/pages/user/user.pages.module').then(m => m.UserPagesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
