import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { ITest } from '@modules/user/test/test.model';

@Component({
  selector: 'app-solved-papers-container',
  templateUrl: './solved-papers-container.component.html',
  styleUrls: ['./solved-papers-container.component.scss']
})
export class SolvedPapersContainerComponent implements OnInit {
  public papers: ITest[];
  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
  ) { }

  async ngOnInit() {
    this.loaderService.show();
    try {
      this.papers = await this.http.get('/tests/solved-papers')
        .toPromise() as ITest[];
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

}
