import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService, ENotification } from '@components/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [ LoaderService ],
})
export class AppComponent implements OnInit, OnDestroy {
  public loading = false;
  public inactiveLoading = false;
  public interval;
  constructor(
    public loaderService: LoaderService,
    public storageService: StorageService,
    public router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.loaderService.loader
      .subscribe( loading => {
        this.loading = loading;
      });
    this.isSessionExpired();
    this.interval = setInterval( () => {
      this.isSessionExpired();
    }, 1000 * 30);
  }

  isSessionExpired() {
    const expiry = this.storageService.getExpiryTime();
    const diff = moment().diff(expiry, 'seconds');
    if (diff >= 0 ) {
      this.storageService.clear();
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
