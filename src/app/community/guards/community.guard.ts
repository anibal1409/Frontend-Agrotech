import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { take, map } from 'rxjs/operators';
import { Role } from 'src/app/common/enum/role.enum';
import { RoutesLogin } from 'src/app/common/enum/routes/routes-login.enum';

@Injectable({
  providedIn: 'root'
})
export class CommunityGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // this.authService.AutoLogin();
      return this.authService.user.pipe(
      take(1),
      map( user => {
        const isAuth = !!user;
        if (isAuth && user.user && user.user.role === Role.BASIC) {
          return true;
        }
        return this.router.createUrlTree([RoutesLogin.SIGN_IN]);
      })
      );
  }
  
}
