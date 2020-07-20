import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CTopic } from '@modules/user/test/test.model';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.scss']
})
export class NotesEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  public data = '<p>Start editing</p>';
  public topicsData: CTopic[];

  public streams: string[] = [];
  public classes: string[] = [];
  public subjects: string[] = [];
  public chapters: string[] = [];
  public topics: string[] = [];

  public criteria = {stream: '', class: '', subject: '', chapter: '', topic: ''};

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
  ) { }

  async ngOnInit() {
    try{
      await this.loaderService.hide();
      this.topicsData = await this.http.get('/chapters/').toPromise();
      this.streams = Array.from(new Set(this.topicsData.map( ob => ob.stream)));
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  streamChange(stream) {
    this.criteria = {stream, class: '', subject: '', chapter: '', topic: ''};
    this.classes = Array.from(new Set(this.topicsData.filter(ob => ob.stream === stream).map( ob => ob.class)));
    this.subjects = [];
    this.chapters = [];
    this.topics = [];
  }

  classChange(std) {
    this.criteria = {stream: this.criteria.stream, class: std, subject: '', chapter: '', topic: ''};
    this.subjects = Array.from(new Set(this.topicsData.filter(ob => ob.class === std).map( ob => ob.subject)));
    this.chapters = [];
    this.topics = [];
  }

  subjectChange(subject) {
    this.criteria = {stream: this.criteria.stream, class: this.criteria.class, subject, chapter: '', topic: ''};
    this.chapters = Array.from(new Set(this.topicsData.filter(ob => ob.subject === subject).map( ob => ob.chapter)));
    this.topics = [];
  }

  chapterChange(chapter) {
    this.criteria = {stream: this.criteria.stream, class: this.criteria.class, subject: this.criteria.subject, chapter, topic: ''};
    this.criteria.chapter = chapter;
    this.topics = Array.from(new Set(this.topicsData.filter(ob => ob.chapter === chapter).map( ob => ob.topic)));
  }

  async topicChange(topic) {
    try {
      this.criteria.topic = topic;
      await this.loaderService.show();
      const notesData = await this.http.get('/notes', this.criteria).toPromise();
      if (notesData && notesData.data) {
        this.data = notesData.data;
      }
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async saveNotes() {
    const notes = {...this.criteria, data: this.data};
    try {
      await this.loaderService.show();
      const notesData = await this.http.post('/notes', notes).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

}
