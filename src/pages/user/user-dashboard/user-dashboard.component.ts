import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [ DrawerService ],
})
export class UserDashboardComponent implements OnInit {
  public menus = [
    {menu: 'My Profile', path: '/user/profile', icon: 'person'},
    {menu: 'Syllabus', path: '/user/syllabus', icon: 'article'},
    {menu: 'Solved Papers', path: '/user/solved-papers', icon: 'done_all'},
    {menu: 'Sample test', path: '/user/test', icon: 'assignment'},
    {menu: 'Start taking test', path: '/user/start-taking-test', icon: 'assignment_turned_in'},
    {menu: 'My Tests', path: '/user/my-tests', icon: 'batch_prediction'},
    {menu: 'Progress', path: '/user/coming-soon', icon: 'analytics'},
    {menu: 'Ask a question', path: '/user/coming-soon', icon: 'forum'},
  ];
  public pageHeader: string;
  public userProfile;
  constructor(
    public drawerService: DrawerService,
    private storageService: StorageService,
    public auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.userProfile = this.storageService.getUser();
    this.drawerService.pageHeader.subscribe( title => this.pageHeader = title );
  }
}
