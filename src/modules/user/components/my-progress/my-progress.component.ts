import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss']
})
export class MyProgressComponent implements OnInit {
  lineChart: IChart;
  barChart: IChart;
  pieChart: IChart;

  barChartSubject = '';
  lineChartType = 'dates'; // datewise, testwise

  subjects = [];

  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.fetchChapters();
    this.generateLineChart();
    this.generatePieChart();
  }

  async fetchChapters() {
    try {
      await this.loaderService.show();
      const subjects = await this.http.get('/chapters/for-tests').toPromise();
      this.subjects = Array.from(new Set(subjects.map(sub => sub.subject)));
      this.barChartSubject = this.subjects[0];
      this.generateBarChart();
    } catch (e) {
    } finally {
      this.loaderService.hide();
    }
  }

  modelChangeLineChartType() {
    this.generateLineChart();
  }

  modelChangeBarchartSubjectType() {
    this.generateBarChart();
  }

  async generateLineChart() {
    this.lineChart = null;
    try {
      const data = await this.http.get('/reports/progress-analysis-line',
        {userId: this.storageService.getUserId(), chartType: this.lineChartType}
      ).toPromise();
      if (data.length) {
        const lineChart: IChart = {};
        lineChart.data = data;
        lineChart.type = 'LineChart';
        lineChart.options = {
          title: 'Progress Analysis',
          width: 600,
          height: 250,
        };
        lineChart.columns = [this.lineChartType === 'dates' ? 'Dates' : 'Tests', 'Progress'];
        this.lineChart = lineChart;
      }
    } catch (e) {
    }
  }

  async generatePieChart() {
    this.pieChart = null;
    try {
      const data = await this.http.get('/reports/progress-analysis-pie',
      {userId: this.storageService.getUserId()}
      ).toPromise();
      if (data.length) {
        const pieChart: IChart = {};
        pieChart.data = data;
        pieChart.type = 'PieChart';
        pieChart.options = {
          title: 'Progress Analysis',
          pieHole: 0.4,
          width: 400,
          height: 254,
          colors: ['#109618', '#dc3912', '#3366cc']
        };
        this.pieChart = pieChart;
      }
    } catch (e) { }
  }

  async generateBarChart() {
    try {
      const data = await this.http.get('/reports/progress-analysis-bar',
        {userId: this.storageService.getUserId(), chartSubject: this.barChartSubject}
      ).toPromise();
      if (data.length) {
        const barChart: IChart = {type: 'BarChart'};
        barChart.data = data;
        barChart.columns = ['Chapter', 'Skipped', 'Wrong', 'Correct'];
        barChart.options = {
          hAxis: {
            title: 'No. of Questions'
          },
          vAxis: {
            minValue: 0,
            title: 'Chapters'
          },
          width: 600,
          height: barChart.data.length * 100,
          colors: ['#3366cc', '#dc3912', '#109618'],
        };
        this.barChart = barChart;
      }
    } catch (e) { }
  }

}

export interface IChart {
  type?: string;
  data?: any;
  options?: any;
  columns?: any;
}
