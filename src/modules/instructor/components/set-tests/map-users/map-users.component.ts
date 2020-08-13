import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGroup } from '../../users-list/users-list.component';
import { IUser } from 'src/auth/authentication/authentication.service';
import { ITest } from '@modules/user/test/test.model';
import { ArrayObjectUtil } from '@core/array-object-util';

@Component({
  selector: 'app-map-users',
  templateUrl: './map-users.component.html',
  styleUrls: ['./map-users.component.scss']
})
export class MapUsersComponent implements OnInit {
  public groups: IGroup[] = [];
  public users: IUser[] = [];
  public selectedGroups: any[];

  public tests: ITest;
  public userNames: string[] = [];
  public isEditing = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {test: ITest, groups: IGroup[], users: IUser[]}) {}

  ngOnInit() {
    this.filterUserNames();
  }

  filterUserNames() {
    const users = this.data.users; // .filter( user => !this.users.includes(user) );
    this.userNames = users.map( user => user.name + '- ' + user.email );
  }

  userSelected(name) {
    this.users.push(this.data.users.find(user => user.name === name.split('- ')[0]));
    this.filterUserNames();
  }

  removeUser(user) {
    ArrayObjectUtil.removeObject(this.users, user);
  }

  selectGroup(e){
    console.log(this.selectedGroups);
  }

}
