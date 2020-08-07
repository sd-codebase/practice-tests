import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-create-paragraphs-page',
  templateUrl: './create-paragraphs-page.component.html',
  styleUrls: ['./create-paragraphs-page.component.scss'],
})
export class CreateParagraphsPageComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Create Info Paragraphs');
  }

}
