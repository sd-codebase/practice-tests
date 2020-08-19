import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public loading = false;
  public inactiveLoading = false;
  constructor(
    public loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loaderService.loader
      .subscribe( loading => {
        this.loading = loading;
        if (!loading) {
          this.inactiveLoading = true;
          setTimeout(() => {
            this.inactiveLoading = false;
          }, 1000);
        }
      });
  }

}
