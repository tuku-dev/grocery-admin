import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-by-date',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ApiService],
  templateUrl: './by-date.component.html',
  styleUrl: './by-date.component.scss',
})
export class ByDateComponent implements OnInit {
  years: any;
  toggleDates = false;
  productData: any = [];
  totalAmount = 0;

  constructor(private apiService: ApiService, private global: GlobalService) {}
  url = environment.apiUrl;

  ngOnInit(): void {
    this.fetchDates();
  }

  fetchDates() {
    this.apiService
      .postData(this.url + 'grocery/grocery-dates', {})
      .subscribe((response) => {
        const result = response.data;
        if (response.status === 200) {
          result.forEach((x: any) => (x.show = false));
          this.years = result;
        }
      });
  }

  toggleDatesList(item: any): void {
    item.show = !item.show;
  }

  closeDate(item: any) {
    this.years.forEach((x: any) => (x.show = false));
    item.show = false;
  }

  fetchData(date: string) {
    console.log(date);
    this.years.forEach((x: any) => (x.show = false));
    this.toggleDates = false;
    this.apiService
      .postData(this.url + 'grocery/by-date', { date })
      .subscribe((response) => {
        const result = response.data;
        console.log(result);

        const sum = 0;
        this.totalAmount = result.reduce(
          (a: any, c: any) => a + c.totalPrice,
          sum
        );

        if (response.status === 200) {
          this.productData = result;
        }
      });
  }
}
