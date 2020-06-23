import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { StorageService } from '@components/storage.serice';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public menus = [
    {menu: 'My Profile', path: '/user/profile', icon: 'person'},
    {menu: 'My Tests', path: '/user/my-tests', icon: 'done'},
    {menu: 'Reports', path: '', icon: 'done'},
    {menu: 'Demo test', path: '/user/test', icon: 'done'},
    {menu: 'Start test', path: '/user/start-taking-test', icon: 'done'},
    {menu: 'Solved Papers', path: '', icon: 'done'},
    {menu: 'Notes', path: '', icon: 'done'},
  ];
  public userProfile;
  public isAdmin = false;
  constructor(
    public drawerService: DrawerService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.userProfile = this.storageService.getUser();
    this.isAdmin = this.userProfile.userId === '5ee352aea4928b0014252d80';
  }

}
