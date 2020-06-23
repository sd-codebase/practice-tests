import { Component, OnInit, Input } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() header: string;
  constructor(public drawerService: DrawerService) { }

  ngOnInit() {
  }

}
