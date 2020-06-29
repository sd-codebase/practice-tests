import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-solved-papers',
  templateUrl: './solved-papers.component.html',
  styleUrls: ['./solved-papers.component.scss']
})
export class SolvedPapersComponent implements OnInit {
  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Solved Papers');
  }

}
