import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { StorageService } from '@components/storage.serice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.auth.userProfile$.subscribe( userData => {
      if (userData && userData.sub) {
        userData.userId = userData.sub.split('|')[1];
      }
      this.storage.setUser( userData );
    });
  }
}
