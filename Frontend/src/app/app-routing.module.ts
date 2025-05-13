import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
