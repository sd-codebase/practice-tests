import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [ DrawerService ],
})
export class AdminDashboardComponent implements OnInit {
  public menus = [
    {menu: 'Questions', path: '/admin/view-questions', icon: 'question_answer'},
    {menu: 'Upload Chapters', path: '/admin/import-chapters', icon: 'cloud_upload'},
    {menu: 'Upload questions', path: '/admin/import-questions', icon: 'cloud_upload'},
    {menu: 'Upload Tests', path: '/admin/import-predefined-test', icon: 'cloud_upload'},
    {menu: 'Validate expression', path: '/admin/validate-maths-expressions', icon: 'check_circle'},
    {menu: 'Verify Questions', path: '/admin/verify-questions', icon: 'check_circle'},
    {menu: 'Animate Content', path: '/admin/animate-content', icon: 'slow_motion_video'},
    {menu: 'Create Notes', path: '/admin/create-notes', icon: 'menu_book'},
  ];

  public pageHeader: string;

  constructor(
    public drawerService: DrawerService,
    public auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.drawerService.pageHeader.subscribe( title => this.pageHeader = title );
  }

}
