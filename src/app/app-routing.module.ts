import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'; // Import the authentication guard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Protect the route with the guard
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'view-alumn',
    loadChildren: () => import('./view-alumn/view-alumn.module').then(m => m.ViewAlumnPageModule),
    canActivate: [AuthGuard] // Protect the route with the guard
  },
  {
    path: 'view-teaching',
    loadChildren: () => import('./view-teaching/view-teaching.module').then(m => m.ViewTeachingPageModule),
    canActivate: [AuthGuard] // Protect the route with the guard
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }