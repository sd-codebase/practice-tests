import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [ LoaderService ],
})
export class AppComponent implements OnInit {
  public loading = false;
  public inactiveLoading = false;
  constructor(
    public loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.loader
      .subscribe( loading => {
        this.loading = loading;
        // if (!loading) {
        //   this.inactiveLoading = true;
        //   setTimeout(() => {
        //     this.inactiveLoading = false;
        //   }, 1000);
        // }
      });
  }
}
