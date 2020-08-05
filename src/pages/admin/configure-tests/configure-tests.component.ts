import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-configure-tests',
  templateUrl: './configure-tests.component.html',
  styleUrls: ['./configure-tests.component.scss']
})
export class ConfigureTestsComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Configure Mock Tests');
  }
}
