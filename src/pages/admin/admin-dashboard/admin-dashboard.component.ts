import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public menus = [
    {menu: 'Questions', path: '/admin/view-questions', icon: 'question_answer'},
    {menu: 'Upload questions', path: '/admin/import-questions', icon: 'cloud_upload'},
    {menu: 'Validate expression', path: '/admin/validate-maths-expressions', icon: 'check_circle'},
  ];
  constructor(public drawerService: DrawerService) { }

  ngOnInit() {
  }

}
