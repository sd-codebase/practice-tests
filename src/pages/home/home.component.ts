import { Component, OnInit } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService, IUser, EUserRole, IEndpoint } from 'src/auth/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public signUpUser: IUser;
  public loginUser: IUser;
  public showView = false;
  public loaderComplete = false;
  public courses = [];

  constructor(
    public auth: AuthenticationService,
    public storageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
    private http: HttpService,
  ) { }

  async ngOnInit() {
    setTimeout(() => {
      this.loaderComplete = true;
      this.isUserAuthenticated();
    }, 3800);
  }

  async isUserAuthenticated() {
    try {
      const courses = await this.http.get('/users/courses').toPromise() as IEndpoint[];
      this.courses = courses.filter( course => course.course !== 'All');
    } catch (e) {
    }
    if (this.auth.isAuthenticated()) {
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
      courses: [],
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
        if (logInUser.role !== EUserRole.GUEST) {
          this.storageService.setMyCourses(logInUser.courses);
          if (logInUser.role === EUserRole.ADMIN) {
            const myCourse = logInUser.courses.find(course => course === 'All') || logInUser.courses[0];
            this.storageService.setMyCourse(myCourse);
          } else {
            this.storageService.setMyCourse(logInUser.courses[0]);
          }
        }
        this.router.navigate([URL[ logInUser.role || 0]]);
      } else {
        this.loaderService.hide();
      }
    } catch (e) {
    } finally {
    }
  }
}

const URL = [
  '/guest', '/instructor', '/user', '/admin'
];
