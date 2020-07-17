import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-syllabus-notes',
  templateUrl: './syllabus-notes.component.html',
  styleUrls: ['./syllabus-notes.component.scss']
})
export class SyllabusNotesComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Syllabus & Notes');
  }

}
