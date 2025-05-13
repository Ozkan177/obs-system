import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginServiceService } from './services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginServiceService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {
  const user = this.loginService.getCurrentUser();
  const url = route.routeConfig?.path;

  if (!user) {
    this.router.navigate(['/']);
    return false;
  }

  if (url?.includes('student') && user.department) {
    this.router.navigate(['/']);
    return false;
  }

  if (url?.includes('teacher') && !user.department) {
    this.router.navigate(['/']);
    return false;
  }

  return true;
}

}
