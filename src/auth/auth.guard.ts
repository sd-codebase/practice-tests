import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

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
  //       if (!loggedIn) {
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
