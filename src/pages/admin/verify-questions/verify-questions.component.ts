import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-verify-questions',
  templateUrl: './verify-questions.component.html',
  styleUrls: ['./verify-questions.component.scss']
})
export class VerifyQuestionsComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Verify Questions');
  }

}
