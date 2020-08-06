import { Component, OnInit } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService, IUser, EUserRole } from 'src/auth/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public signUpUser: IUser;
  public loginUser: IUser;
  public showView = false;

  constructor(
    public auth: AuthenticationService,
    public storageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (this.auth.isAuthenticated()) {
      await this.loaderService.show();
      const logInUser = this.storageService.getUser();
      if (logInUser) {
        this.router.navigate([URL[ logInUser.role || 0]]);
      }
    } else {
      this.showView = true;
    }
    this.loginUser = {
      email: '',
      password: '',
    };
    this.signUpUser = {
      email: '',
      password: '',
      name: '',
      course: '',
    };
  }

  get isGuestUser() {
    return this.loginUser.email && !this.loginUser.password;
  }

  get isUser() {
    return this.loginUser.email && this.loginUser.password;
  }

  async login(isGuest: boolean) {
    try {
      await this.loaderService.show();
      const user: any = this.loginUser;
      if (isGuest) {
        user.userType = 'Guest';
      }
      const logInUser = await this.auth.login(user);
      if (logInUser) {
        if (logInUser.role === EUserRole.USER) {
          this.storageService.setMyCourse(logInUser.course);
        }
        this.router.navigate([URL[ logInUser.role || 0]]);
      }
    } catch (e) {

    } finally {
    }
  }
}

const URL = [
  '/guest', '/instructor', '/user', '/admin'
];
