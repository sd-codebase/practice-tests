import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { ITest } from '../../test.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-test',
  templateUrl: './generate-test.component.html',
  styleUrls: ['./generate-test.component.scss']
})
export class GenerateTestComponent implements OnInit {
  public test: ITest;

  constructor(
    private http: HttpService,
    private storage: StorageService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async createTest() {
    this.loaderService.show();
    try {
      this.test = await this.http.post('/tests', {userId: this.storage.getUserId()}).toPromise() as ITest;
      if (this.test) {
        this.router.navigate(['/user/attempt-test', this.test._id]);
      }
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

}
