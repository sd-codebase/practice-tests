import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss'],
  providers: [ DrawerService ],
})
export class InstructorDashboardComponent implements OnInit {
  public menus = [
    {menu: 'My Profile', path: '/instructor/profile', icon: 'person_pin'},
    {menu: 'Users', path: '/instructor/users', icon: 'person_pin'},
    {menu: 'Tests', path: '/instructor/tests', icon: 'assignment'},
    {menu: 'Reports', path: '/instructor/reports', icon: 'analytics'},
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
