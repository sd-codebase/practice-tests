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

  constructor(public gs: GlobalService) { }

  ngOnChanges(changes: SimpleChanges) {
   if (changes.content) {
      this.renderMath();
    }
  }

  renderMath() {
    // tslint:disable-next-line: no-string-literal
    this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'];
    const angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(['Typeset', angObj.mathJaxObject.Hub], 'mathContent');
    }, 1000);
  }

  loadMathConfig() {
    // tslint:disable-next-line: no-string-literal
    this.mathJaxObject  = this.gs.nativeGlobal()['MathJax'] ;
    this.mathJaxObject.Hub.Config({
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
}
