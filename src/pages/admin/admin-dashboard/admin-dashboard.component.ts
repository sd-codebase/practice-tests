import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
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
  constructor(public drawerService: DrawerService, public auth: AuthService) { }

  ngOnInit() {
  }

}
