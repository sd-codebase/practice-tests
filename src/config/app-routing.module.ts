import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '@pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '@pages/user/user-dashboard/user-dashboard.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { HomeComponent } from '@pages/home/home.component';
import { AdminAuthGuard } from 'src/auth/admin.auth.guard';
import { InstructorDashboardComponent } from '@pages/instructor/components/instructor-dashboard/instructor-dashboard.component';
import { GuestDashboardComponent } from '@pages/guest/components/guest-dashboard/guest-dashboard.component';
import { PolicyComponent } from '@pages/policy/policy.component';


const routes: Routes = [
  { path: 'policy', component: PolicyComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [ AdminAuthGuard ], canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('src/pages/admin/admin.pages.module').then(m => m.AdminPagesModule),
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [ AuthGuard], canActivateChild: [AuthGuard],
    loadChildren: () => import('src/pages/user/user.pages.module').then(m => m.UserPagesModule),
  },
  {
    path: 'instructor', component: InstructorDashboardComponent, canActivate: [ AuthGuard], canActivateChild: [AuthGuard],
    loadChildren: () => import('src/pages/instructor/instructor.pages.module').then(m => m.InstructorPagesModule),
  },
  {
    path: 'guest', component: GuestDashboardComponent, canActivate: [ AuthGuard], canActivateChild: [AuthGuard],
    loadChildren: () => import('src/pages/guest/guest.pages.module').then(m => m.GuestPagesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
