import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService, IUser, EUserRole, IEndpoint } from 'src/auth/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { validateEmail, validatePassword } from '@core/validation-util';

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
  public hasOtp = false;
  public forgotPassword: IForgotPasswordUser = {email: ''};

  @ViewChild('canvasEl', {static: false}) canvasEl: ElementRef;
  private context: CanvasRenderingContext2D;

  constructor(
    public auth: AuthenticationService,
    public storageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
    private http: HttpService,
    private notificationService: NotificationService,
  ) { }

  drawCanvas(content) {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw(content);
  }

  draw(content) {
    this.context.font = '50px Arial';
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';

    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
    this.context.fillText('UIN: ' + content, x, y);
  }

  async ngOnInit() {
    setTimeout(() => {
      this.loaderComplete = true;
      this.isUserAuthenticated();
    }, 3800);
  }

  async resetPassword() {
    if (!validateEmail(this.forgotPassword.email) || !validatePassword(this.forgotPassword.password)) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, 'Required: valid email, otp, password length at least 8');
      return;
    }
    try {
      await this.loaderService.show();
      await this.http.put('/users/reset-password', this.forgotPassword).toPromise();
      this.hasOtp = false;
      this.drawCanvas('0000');
      this.notificationService.show(ENotification.SUCCESS, 'Password Reset', 'Password reset successfully, please login');
    } catch ({err: e}) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async forgotPasswordGetOtp() {
    if (!validateEmail(this.forgotPassword.email)) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, 'Required: valid email');
      return;
    }
    try {
      await this.loaderService.show();
      const user = await this.http.put('/users/forgot-password', this.forgotPassword).toPromise() as any;
      if (user && user.otp) {
        this.hasOtp = true;
        this.drawCanvas(user.otp);
      } else {
        this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, 'Something wend wrong');
      }
    } catch ({err: e}) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
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
      if (!validateEmail(this.loginUser.email) || !validatePassword(this.loginUser.password)) {
        this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, 'Required: valid email and password length at least 8.');
        return;
      }
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

export interface IForgotPasswordUser {
  email: string;
  otp?: string;
  password?: string;
}
