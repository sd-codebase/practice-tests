import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-generate-tests',
  templateUrl: './generate-tests.component.html',
  styleUrls: ['./generate-tests.component.scss']
})
export class GenerateTestsComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Generate Test');
  }

}
