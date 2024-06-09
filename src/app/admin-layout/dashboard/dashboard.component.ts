import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../env/environment';
import { ApiService } from '../../api.service';
import { GlobalService } from '../../global.service';
import Chart, { BarController, Colors, Legend } from 'chart.js/auto';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, BaseChartDirective, FormsModule, CommonModule],
  providers: [ApiService, provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  url = environment.apiUrl;
  type = 'line';
  chartType = 'line';
  yearList: any = [];
  theYear = '';
  lineChartData: any | undefined;
  constructor(
    private apiService: ApiService,
    protected global: GlobalService
  ) {}

  ngOnInit(): void {
    this.getYears();
    this.getPricingPerMonth();

    if (this.theYear === '') {
      this.theYear = moment(new Date()).format('YYYY');
    }
    this.fetchData();
  }

  getYears() {
    this.apiService
      .postData(this.url + 'dashboard/year-list', {})
      .subscribe((response) => {
        if (response.status === 200) {
          this.yearList = response.data;
        }
      });
  }

  fetchData() {
    this.apiService
      .postData(this.url + 'dashboard/year-data', { year: this.theYear })
      .subscribe((response) => {
        let priceList: any = [];
        let monthList: any = [];
        if (response.status === 200) {
          response.data.yearData.forEach((item: any) => {
            priceList.push(item.totalPrice);
            monthList.push(this.global.months[item.month - 1]);
          });
          this.preparePricePerMonth({
            priceList,
            monthList,
            year: response.data.year,
          });
        }
      });
  }

  preparePricePerMonth(data: any) {
    this.lineChartData = {
      labels: data.monthList,
      datasets: [
        {
          label: 'Price chart for year' + data.year,
          data: data.priceList,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    };
    let config = {
      type: 'line',
      data: this.lineChartData,
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100,
          },
        },
      },
    };
  }

  getPricingPerMonth() {
    this.apiService
      .postData(this.url + 'dashboard/sum-by-dates', {
        page: 1,
        perPage: 12,
      })
      .subscribe((response) => {
        let x = response.data.filter((x: any) => x.monthYear);
        const totals = response.data.map((item: any) => item.total);
        const monthYears = response.data.map((item: any) => item.monthYear);

        // this.lineChartData = {
        //   labels: monthYears,
        //   dataSets: [
        //     {
        //       data: totals,
        //       label: 'Ration Expenses',
        //     },
        //   ],
        // };
      });
  }
}
