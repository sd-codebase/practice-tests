import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor(public drawerService: DrawerService) { }

  ngOnInit() {
  }

}
