import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/auth/authentication/authentication.service';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { MatDialog } from '@angular/material/dialog';
import { UserGroupsComponent } from '../user-groups/user-groups.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: IUser[] = [];
  public groups: IGroup[] = [];
  public newUser: IUser;
  public newGroup: IGroup;
  public pageAction = 'USER';

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.discardUser();
    this.discardGroup();
    this.fetchUsers();
    this.fetchUserGroups();
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

  async fetchUserGroups() {
    await this.loaderService.show();
    try {
      this.groups = await this.http.get(`/users/user-groups/${this.storageService.getUserId()}`).toPromise() as IGroup[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async addGuest() {
    await this.loaderService.show();
    try {
      const user = await this.http.post(`/users/add-guests`, this.newUser).toPromise() as IUser;
      this.users.unshift(user);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async addGroup() {
    await this.loaderService.show();
    try {
      const group = await this.http.post(`/users/create-guest-user-group`, this.newGroup).toPromise() as IGroup;
      this.groups.unshift(group);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async updateGroup(group: IGroup) {
    await this.loaderService.show();
    try {
      await this.http.post(`/users/update-users-to-group`, group).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.SUCCESS, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  discardGroup() {
    this.newGroup = {
      name: '',
      users: [],
      belongsTo: this.storageService.getUserId(),
    };
  }

  discardUser() {
    this.newUser = {
      name: '',
      belongsTo: this.storageService.getUserId(),
      email: '',
      contact: '',
    };
  }

  openUserGroupDialog(group: IGroup) {
    const dialogRef = this.dialog.open(UserGroupsComponent, {
      data: {
        group,
        users: this.users.filter( user => user.enabled)
      }
    });

    dialogRef.afterClosed().subscribe((result: IUser[]) => {
      group.users = result.map( user => user._id);
      this.updateGroup(group);
    });
  }

}

export interface IGroup {
  _id?: string;
  name: string;
  users?: string[];
  belongsTo: string;
}
