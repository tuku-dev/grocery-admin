import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../api.service';
import { GlobalService } from '../../../global.service';
import { AddComponentModal } from '../add/add.component.modal';
import { environment } from './../../../../../env/environment';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
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
  fetchData: any;
  filter = '';

  constructor(
    private apiService: ApiService,
    private global: GlobalService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  url = environment.apiUrl;

  ngOnInit(): void {
    this.fetchPage('first');
  }

  fetchApi(fetchData: any) {
    this.apiService
      .postData(this.url + 'product/list', fetchData)
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

  openAddProductForm() {
    let dialogRef = this.dialog.open(AddComponentModal, {
      height: '400px',
      width: '600px',
      data: { name: 'hello', age: 'world' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.status) {
        this.fetchPage('first');
        this._snackBar.open('Product Created', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-success'],
        });
      }
    });
  }

  searchProduct() {
    this.fetchData.productName = this.filter;
    this.fetchApi(this.fetchData);
  }
}
