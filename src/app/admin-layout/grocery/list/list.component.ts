import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';
import { GlobalService } from '../../../global.service';
import { AddComponent } from '../add/add.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from '../view/view.component';
import moment from 'moment';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, MatIconModule],
  providers: [ApiService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  productData: any = [];
  totalRecord = 0;
  page = 1;
  recordsPerPage = 0;
  pager = 0;
  fetchData: any;
  filter = '';
  openAction = '';
  prevAction = '';
  clicked = 0;

  constructor(
    private apiService: ApiService,
    protected global: GlobalService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  url = environment.apiUrl;

  ngOnInit(): void {
    this.getSettings();
    this.fetchPage('first');
  }

  getSettings() {
    this.apiService
      .postModule(this.url + 'grocery/settings', {})
      .subscribe((response) => {
        console.log(response);
        this.recordsPerPage = response.data.perPage;
      });
  }

  fetchApi(fetchData: any) {
    this.apiService
      .postModule(this.url + 'grocery/list', fetchData)
      .subscribe((response) => {
        const result = response.data;

        if (response.status === 200) {
          this.productData = this.global.slno(
            result.records,
            this.page,
            this.recordsPerPage
          );
          // this.productData.forEach((x: any) => {
          //   x.dateOfPurchase = moment(x.dateOfPurchase)
          //     .subtract(1, 'day')
          //     .format('YYYY-MM-DD');
          // });

          this.totalRecord = result.totalRecord;
          this.pager = Math.ceil(this.totalRecord / this.recordsPerPage);
        }
      });
  }

  openAddGroceryForm() {
    let dialogRef = this.dialog.open(AddComponent, {
      height: 'auto',
      width: '600px',
      data: {
        title: 'Add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status && result.status !== undefined) {
        this.fetchPage('first');
        this._snackBar.open('Product Created', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-success'],
        });
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
    if (this.filter !== '') this.fetchData.itemName = this.filter;

    this.fetchApi(this.fetchData);
  }

  searchProduct() {
    this.fetchData['itemName'] = this.filter;
    this.fetchApi(this.fetchData);
  }
  clear() {
    this.filter = '';
    this.fetchPage('first');
  }

  toggleAction(id: string) {
    this.openAction = id;
    if (this.prevAction === id) {
      this.clicked = 0;
      this.prevAction = '';
    } else {
      this.clicked = 1;
      this.prevAction = id;
    }
  }
  viewProduct(item: any) {
    this.dialog.open(ViewComponent, {
      height: 'auto',
      width: '600px',
      data: {
        title: 'View',
        item,
      },
    });
  }
  editProduct(item: any) {
    let dialogRef = this.dialog.open(AddComponent, {
      height: 'auto',
      width: '600px',
      data: {
        title: 'Update',
        item,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status && result.status !== undefined) {
        this.fetchPage('first');
        this._snackBar.open('Product Updated', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-success'],
        });
      }
    });
  }
  deleteProduct(item: any) {}
}
