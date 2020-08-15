import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.scss'],
  providers: [ GlobalService ],
})
export class MathjaxComponent implements OnChanges, OnInit {
  @Input() content: string;
  mathJaxObject;
  public elementId = Math.random().toString();

  constructor(public gs: GlobalService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content) {
      this.loadMathConfig();
      this.renderMath();
    }
  }

  renderMath() {
    // tslint:disable-next-line: no-string-literal
    this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxObject.Hub.Queue(['Typeset', this.mathJaxObject.Hub, this.elementId]);
    // setTimeout(() => {
    // angObj.mathJaxObject.Hub.Queue(['Typeset', angObj.mathJaxObject.Hub], 'idOfElement');
    // }, 1000);
  }

  loadMathConfig() {
    // tslint:disable-next-line: no-string-literal
    this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'] ;
    this.mathJaxObject.Hub.Config({
      messageStyle: 'none',
      showMathMenu: false,
      tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
      menuSettings: { zoom: 'Double-Click', zscale: '150%' },
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    });
  }

  ngOnInit() {
     this.loadMathConfig();
     this.renderMath();
  }

  disableUi() {

  }

  enableUi() {

  }
}
