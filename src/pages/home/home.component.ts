import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService, IUser, EUserRole, IEndpoint } from 'src/auth/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { validateEmail, validatePassword } from '@core/validation-util';
import { AvailableCoursesService } from '@components/AvailableCoursesService';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appName = 'Assessment Portal';
  public signUpUser: IUser;
  public loginUser: IUser;
  public showView = false;
  public loaderComplete = false;
  public courses = [];
  public hasOtp = false;
  public forgotPassword: IForgotPasswordUser = {email: ''};
  public activeTab = 'LOGIN';

  @ViewChild('canvasEl', {static: false}) canvasEl: ElementRef;
  private context: CanvasRenderingContext2D;

  constructor(
    public auth: AuthenticationService,
    public storageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
    private http: HttpService,
    private notificationService: NotificationService,
    private availableCourseService: AvailableCoursesService,
    private dialog: MatDialog,
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
    this.appName = this.availableCourseService.availableCourse ?
      this.availableCourseService.availableCourse + ' Test Series' : 'Jee-Neet Test Series';
    setTimeout(() => {
      this.loaderComplete = true;
      this.isUserAuthenticated();
    }, 3800);
  }

  isValidPassword(pswd) {
    if ( pswd.length < 8 ) {
      return false;
    }
    if ( !pswd.match(/[A-z]/) ) {
      return false;
    }

    if ( !pswd.match(/[A-Z]/) ) {
      return false;
    }

    if ( !pswd.match(/\d/) ) {
      return false;
    }

    if ( !pswd.match(/[^a-zA-Z0-9\-\/]/) ) {
      return false;
    }
    return true;
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
      // this.drawCanvas('0000');
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
      await this.http.put('/users/forgot-password', this.forgotPassword).toPromise();
      this.hasOtp = true;
      this.notificationService.show(ENotification.SUCCESS, 'Otp Sent', 'OTP sent on email id');
    } catch ({error: e}) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e && e.message);
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
          if (this.availableCourseService.availableCourse && logInUser.courses.includes(this.availableCourseService.availableCourse)) {
            this.storageService.setMyCourses([this.availableCourseService.availableCourse]);
          } else if (
            this.availableCourseService.availableCourse && !logInUser.courses.includes(this.availableCourseService.availableCourse)
          ) {
            this.storageService.setMyCourses([]);
          } else {
            this.storageService.setMyCourses(logInUser.courses);
          }

          if (logInUser.role === EUserRole.ADMIN) {
            const myCourse = logInUser.courses.find(course => course === 'All') || logInUser.courses[0];
            this.storageService.setMyCourse(myCourse);
          } else {
            if (this.availableCourseService.availableCourse && logInUser.courses.includes(this.availableCourseService.availableCourse)) {
              this.storageService.setMyCourse(this.availableCourseService.availableCourse);
            } else if (
              this.availableCourseService.availableCourse && !logInUser.courses.includes(this.availableCourseService.availableCourse)
            ) {
              this.storageService.setMyCourse('');
            } else {
              this.storageService.setMyCourse(logInUser.courses[0]);
            }
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

  forgotInfo() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Instructions',
        html: `
        <p>In case of forgot Email Id/Username,<br>please write us on kslabs.care@gmail.com<br>along with your Username recovery key.</p>
        <mat-hint>
            <strong>Password Must Contain</strong>
            <ul>
                <li>At least 8 characters</li>
                <li>One letter</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
            </ul>
        </mat-hint>
        `,
        button1: {text: 'Ok', value: true, color: 'primary'}
      }
    });
  }

  signUpInfo() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Instructions',
        html: `
        <mat-hint>
            <strong>Email Id/Username</strong>
            <ul>
                <li>Email Id will be your username</li>
                <li>Please use your authorized emailid<br>so that you can verify it using otp</li>
                <li>Verification is necessary to get Full access</li>
                <li>Please enter username recovery key<br>(free text 20 characters, confidetial)</li>
            </ul>
        </mat-hint>
        <mat-hint>
            <strong>Password Must Contain</strong>
            <ul>
                <li>At least 8 characters</li>
                <li>One letter</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
            </ul>
        </mat-hint>
        `,
        button1: {text: 'Ok', value: true, color: 'primary'}
      }
    });
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
