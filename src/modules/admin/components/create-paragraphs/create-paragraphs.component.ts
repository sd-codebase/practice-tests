import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-create-paragraphs',
  templateUrl: './create-paragraphs.component.html',
  styleUrls: ['./create-paragraphs.component.scss']
})
export class CreateParagraphsComponent implements OnInit {
  public para: IInfoPara;
  public paraList: IInfoPara[];
  public isValidate = false;

  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private storageService: StorageService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.para = this.newPara();
    this.fetchParas();
  }

  async addPara() {
    try {
      await this.loaderService.show();
      const para = await this.http.post('/questions/create-info-para', this.para).toPromise() as IInfoPara;
      this.paraList.unshift(para);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async updatePara() {
    try {
      await this.loaderService.show();
      const para = await this.http.post('/questions/update-info-para', this.para).toPromise() as IInfoPara;
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async fetchParas() {
    try {
      await this.loaderService.show();
      this.paraList = await this.http.get('/questions/info-para').toPromise() as IInfoPara[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  onChange(changes: string) {
    this.validate();
  }

  validate() {
    this.isValidate = false;
    setTimeout(() => {
      this.isValidate = true;
    }, 100);
  }

  discardPara() {
    this.para = this.newPara();
  }

  selectPara(para) {
    this.para = para;
  }

  newPara() {
    return {
      content: '',
      tags: '',
      createdBy: this.storageService.getUserId()
    };
  }

}

export interface IInfoPara {
  _id?: string;
  paraId?: number;
  content: string;
  tags: string;
  updateBy?: string;
  createdBy: string;
}
