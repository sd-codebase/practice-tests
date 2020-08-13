import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { ITest } from '@modules/user/test/test.model';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';

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
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  async ngOnInit() {
    try {
      await this.loaderService.show();
      const papers = await this.http.get(`/tests/solved-papers/${this.storageService.getUserId()}`)
        .toPromise() as ITest[];
      const course = this.storageService.getMyCourse();
      this.papers = papers.filter( paper => paper.courses.includes(course));
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

}
