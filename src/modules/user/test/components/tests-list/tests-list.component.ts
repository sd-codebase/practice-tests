import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { ITest } from '../../test.model';
import { StorageService } from '@components/storage.serice';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {
  public tests: ITest[];
  constructor(
    private http: HttpService,
    private storage: StorageService,
    private loaderService: LoaderService,
  ) { }

  async ngOnInit() {
    this.loaderService.show();
    this.tests = await this.http.get('/tests/all', {userId: this.storage.getUserId()}).toPromise();
    this.loaderService.hide();
  }

}
