import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '@components/http.service';

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
  ) {}

  ngOnInit() {
    this.fetchChapters();
  }

  async fetchChapters() {
    this.data = await this.http.get('/chapters').toPromise();
    this.subjects = Array.from(new Set(this.data.map( ob => ob.subject)));
  }

  getChapters(subject: string) {
    return Array.from(new Set(this.data.filter(ob => ob.subject === subject).map( ob => ob.chapter)));
  }

  getTopics(chapter: string) {
    return Array.from(new Set(this.data.filter(ob => ob.chapter === chapter).map( ob => ob.topic)));
  }

  async getNotes(subject, chapter, topic?) {
    this.menus = false;
    const notesData = await this.http.get('/notes', {subject, chapter, topic}).toPromise();
    if (notesData && notesData.data) {
      this.content = notesData.data;
    }
  }

  showMenu() {
    this.menus = true;
  }

}
