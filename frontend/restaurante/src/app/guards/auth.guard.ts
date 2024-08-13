import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const role = this.authService.getUserRole();
      if (this.authService.isLoggedIn() && role === route.data['role']) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
