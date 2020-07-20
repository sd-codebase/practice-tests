import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-syllabus-and-notes',
  templateUrl: './syllabus-and-notes.component.html',
  styleUrls: ['./syllabus-and-notes.component.scss']
})
export class SyllabusAndNotesComponent implements OnInit {
  public data: any;
  public content: string;
  public subjects: string[];
  public menus = true;

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.fetchChapters();
  }

  async fetchChapters() {
    try {
      await this.loaderService.show();
      this.data = await this.http.get('/chapters').toPromise();
      this.subjects = Array.from(new Set(this.data.map( ob => ob.subject)));
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  getChapters(subject: string) {
    return Array.from(new Set(this.data.filter(ob => ob.subject === subject).map( ob => ob.chapter)));
  }

  getTopics(chapter: string) {
    return Array.from(new Set(this.data.filter(ob => ob.chapter === chapter).map( ob => ob.topic)));
  }

  async getNotes(subject, chapter, topic?) {
    try {
      await this.loaderService.show();
      this.menus = false;
      const notesData = await this.http.get('/notes', {subject, chapter, topic}).toPromise();
      if (notesData && notesData.data) {
        this.content = notesData.data;
      }
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  showMenu() {
    this.menus = true;
  }

}
