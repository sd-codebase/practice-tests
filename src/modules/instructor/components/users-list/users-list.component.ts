import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/auth/authentication/authentication.service';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: IUser[] = [];
  public newUser: IUser;
  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.discardUser();
    this.fetchUsers();
  }

  async fetchUsers() {
    await this.loaderService.show();
    try {
      this.users = await this.http.get(`/users/fetch-guests/${this.storageService.getUserId()}`).toPromise() as IUser[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async addGuest() {
    await this.loaderService.show();
    try {
      await this.http.post(`/users/add-guests`, this.newUser).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.SUCCESS, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  discardUser() {
    this.newUser = {
      name: '',
      belongsTo: this.storageService.getUserId(),
      email: '',
      contact: '',
    };
  }

}
