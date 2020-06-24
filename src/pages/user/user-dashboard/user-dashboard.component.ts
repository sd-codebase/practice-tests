import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { StorageService } from '@components/storage.serice';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public menus = [
    {menu: 'My Profile', path: '/user/profile', icon: 'person'},
    {menu: 'My Tests', path: '/user/my-tests', icon: 'batch_prediction'},
    {menu: 'Reports', path: '/user/coming-soon', icon: 'analytics'},
    {menu: 'Demo test', path: '/user/test', icon: 'assignment'},
    {menu: 'Start taking test', path: '/user/start-taking-test', icon: 'assignment_turned_in'},
    {menu: 'Solved Papers', path: '/user/coming-soon', icon: 'done_all'},
    {menu: 'Notes', path: '/user/coming-soon', icon: 'article'},
  ];
  public userProfile;
  public isAdmin = false;
  constructor(
    public drawerService: DrawerService,
    private storageService: StorageService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.userProfile = this.storageService.getUser();
    this.isAdmin = this.userProfile.userId === '5ee352aea4928b0014252d80';
  }
}
