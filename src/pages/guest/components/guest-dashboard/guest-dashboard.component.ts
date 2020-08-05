import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { AuthenticationService } from 'src/auth/authentication/authentication.service';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss'],
  providers: [ DrawerService ],
})
export class GuestDashboardComponent implements OnInit {
  public menus = [
    {menu: 'Tests', path: '/guest/tests', icon: 'assignment'},
  ];

  public pageHeader: string;

  constructor(
    public drawerService: DrawerService,
    public auth: AuthenticationService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.hide();
    this.drawerService.pageHeader.subscribe( title => this.pageHeader = title );
  }
}
