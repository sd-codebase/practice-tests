import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class GuestAttemptTestComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('My tests');
  }

}
