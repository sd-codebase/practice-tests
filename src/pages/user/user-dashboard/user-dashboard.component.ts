import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { StorageService } from '@components/storage.serice';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';
import { LoaderService } from '@components/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  providers: [ DrawerService ],
})
export class UserDashboardComponent implements OnInit {
  public menus = [
    {menu: 'My Profile', path: '/user/profile', icon: 'person'},
    {menu: 'Short Notes', path: '/user/syllabus', icon: 'article'},
    {menu: 'Solved Papers', path: '/user/solved-papers', icon: 'done_all'},
    // {menu: 'Sample test', path: '/user/test', icon: 'assignment'},
    {menu: 'Start Taking Test', path: '/user/start-taking-test', icon: 'assignment_turned_in'},
    {menu: 'My Tests', path: '/user/my-tests', icon: 'batch_prediction'},
    {menu: 'Progress', path: '/user/my-progress', icon: 'analytics'},
    {menu: 'Ask A question', path: '/user/coming-soon', icon: 'forum'},
  ];
  public pageHeader: string;
  public userProfile;
  public myCourses = [];
  public myCourse = '';

  constructor(
    public drawerService: DrawerService,
    private storageService: StorageService,
    public auth: AuthenticationService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loaderService.hide();
    this.userProfile = this.storageService.getUser();
    this.drawerService.pageHeader.subscribe( title => this.pageHeader = title );
    this.myCourses = this.storageService.getMyCourses();
    this.myCourse = this.storageService.getMyCourse();
  }

  courseChange() {
    this.storageService.setMyCourse(this.myCourse);
    this.router.navigate(['/user']);
  }
}
