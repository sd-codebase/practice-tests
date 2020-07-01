import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-animate-content',
  templateUrl: './animate-content.component.html',
  styleUrls: ['./animate-content.component.scss']
})
export class AnimateContentComponent implements OnInit {
  public content = '$ a^2 + 2ab + b^2 + { 2 \\over 5} $';
  public contents = [
    { num: 1, element: 'animate1', content: this.content, timeOut: 0, timeSpend: 7, lineBreak: true },
    { num: 2, element: 'animate2', content: this.content, timeOut: 8, timeSpend: 7},
    { num: 3, element: 'animate3', content: this.content, timeOut: 16, timeSpend: 7 , lineBreak: true},
    { num: 4, element: 'animate4', content: this.content, timeOut: 24, timeSpend: 7 },
    { num: 5, element: 'animate5', content: this.content, timeOut: 35, timeSpend: 7 },
  ];
  constructor(
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Animate Content');
  }

  animate() {
    this.contents.forEach( contentBlock => {
      setTimeout( () => {
        $('#' + contentBlock.element).animate({
          width: 'toggle',
        }, contentBlock.timeSpend * 1000);
      }, contentBlock.timeOut * 1000);
    });
  }

}
