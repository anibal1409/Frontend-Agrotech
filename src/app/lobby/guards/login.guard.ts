import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { take, map } from 'rxjs/operators';
import { Role } from 'src/app/common/enum/role.enum';
import { RoutesAdmin } from 'src/app/common/enum/routes/routes-admin.enum';
import { RoutesCommunity } from 'src/app/common/enum/routes/routes-community.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
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
        console.log('!isAuth', user);
        
        if (!isAuth) {
          return true;
        }
        return this.router.createUrlTree([user.user.role === Role.ADMIN ? RoutesAdmin.HOME : RoutesCommunity.HOME]);
      })
      );
  }
  
}
