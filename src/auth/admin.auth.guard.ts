import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {

  constructor(
      private auth: AuthenticationService,
      private router: Router,
  ) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
  //   return this.auth.isAuthenticated$.pipe(
  //     tap(loggedIn => {
  //       if (!loggedIn || (loggedIn && this.storage.getUserId() !== '5ee352aea4928b0014252d80')) {
  //         this.auth.login(state.url);
  //       }
  //     })
  //   );
  // }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
