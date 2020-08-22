import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-dashboard-widget-page',
  templateUrl: './dashboard-widget-page.component.html',
  styleUrls: ['./dashboard-widget-page.component.scss']
})
export class DashboardWidgetPageComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Dashboard');
  }

}
