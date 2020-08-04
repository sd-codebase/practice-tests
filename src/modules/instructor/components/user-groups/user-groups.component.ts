import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IGroup } from '../users-list/users-list.component';
import { IUser } from 'src/auth/authentication/authentication.service';
import { ArrayObjectUtil } from '@core/array-object-util';


@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  public users: IUser[] = [];
  public userNames: string[] = [];
  public isEditing = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {group: IGroup, users: IUser[]}) {}

  ngOnInit() {
    this.mapUsers();
    this.filterUserNames();
  }

  filterUserNames() {
    const users = this.data.users.filter( user => !this.users.includes(user) );
    this.userNames = users.map( user => user.name + '- ' + user.email );
  }

  userSelected(name) {
    this.users.push(this.data.users.find(user => user.name === name.split('- ')[0]));
    this.filterUserNames();
  }

  mapUsers() {
    this.users = this.data.users.filter( user => this.data.group.users.includes(user._id));
  }

  removeUser(user) {
    ArrayObjectUtil.removeObject(this.users, user);
  }
}
