import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { StorageService } from '@components/storage.serice';
import { HttpService } from '@components/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpService,
  ) {}

  ngOnInit() {
    this.auth.userProfile$.subscribe( userData => {
      if (userData && userData.sub) {
        userData.userId = userData.sub.split('|')[1];
        this.saveUser(userData);
      }
      this.storage.setUser( userData );
    });
  }

  async saveUser(userData) {
    await this.http.post('/users', userData).toPromise();
  }
}
