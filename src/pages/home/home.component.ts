import { Component, OnInit } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService, IUser } from 'src/auth/authentication/authentication.service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/user']);
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

  async login() {
    try {
      const logIn = await this.auth.login(this.loginUser);
      if (logIn) {
        this.router.navigate(['/user']);
      }
    } catch (e) {

    } finally {

    }
  }
}
