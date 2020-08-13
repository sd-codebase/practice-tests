import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-set-test',
  templateUrl: './set-test.component.html',
  styleUrls: ['./set-test.component.scss']
})
export class SetTestComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Tests');
  }
}
