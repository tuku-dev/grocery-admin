import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ApiService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  productData: any = [Object];
  totalRecord = 0;
  page = 1;
  recordsPerPage = 10;
  pager = 0;
  fetchData: Object = {};

  constructor(private apiService: ApiService, private global: GlobalService) {}
  url = environment.apiUrl;

  ngOnInit(): void {
    this.fetchPage('first');
  }

  fetchApi(fetchData: any) {
    this.apiService
      .postData(this.url + 'grocery/list', fetchData)
      .subscribe((response) => {
        const result = response.data;
        if (response.status === 200) {
          this.productData = this.global.slno(
            result.records,
            this.page,
            this.recordsPerPage
          );

          this.totalRecord = result.totalRecord;
          this.pager = Math.ceil(this.totalRecord / this.recordsPerPage);
        }
      });
  }

  fetchPage(type: any) {
    if (type === 'first') {
      this.page = 1;
    } else if (type === 'last') {
      this.page = this.pager;
    } else if (type === 'prev' && this.page > 1) {
      this.page--;
    } else if (type === 'next' && this.page < this.pager) {
      this.page++;
    }
    this.fetchData = {
      page: this.page,
      perPage: this.recordsPerPage,
    };

    this.fetchApi(this.fetchData);
  }
}
