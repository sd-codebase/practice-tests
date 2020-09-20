import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerService } from '@components/drawer-service';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { EError, ENotification, NotificationService } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {
  public userProfile;
  public otp: string;

  constructor(
    public storageService: StorageService,
    private loaderService: LoaderService,
    private router: Router,
    private http: HttpService,
    private notificationService: NotificationService,
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Verification');
    this.userProfile = this.storageService.getUser();
  }

  async verifyAccount() {
    try {
      await this.loaderService.show();
      await this.http.post('/users/verify-account', {email: this.userProfile.email, otp: this.otp}).toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Verification Successful', 'Account verification successful');
      this.userProfile.email_verified = true;
      this.storageService.setUser(this.userProfile);
      this.router.navigate(['/']);
    } catch ({error: e}) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e && e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async resendOtp() {
    try {
      await this.loaderService.show();
      await this.http.post('/users/resend-otp', {email: this.userProfile.email}).toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Otp Sent', 'OTP sent on email id');
    } catch ({error: e}) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e && e.message);
    } finally {
      this.loaderService.hide();
    }
  }

}
