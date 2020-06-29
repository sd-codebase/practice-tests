import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { StorageService } from '@components/storage.serice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isAdmin = false;
  constructor(
    public auth: AuthService,
    public storageService: StorageService,
  ) { }

  ngOnInit() {
  }
}
