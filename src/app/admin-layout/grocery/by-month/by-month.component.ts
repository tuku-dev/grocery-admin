import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../api.service';
import { GlobalService } from '../../../global.service';
import { environment } from '../../../../../env/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewComponent } from '../view/view.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-by-month',
  templateUrl: './by-month.component.html',
  styleUrls: ['./by-month.component.scss'],
  imports: [HttpClientModule, CommonModule, FormsModule, MatIconModule],
  standalone: true,
  providers: [ApiService],
})
export class ByMonthComponent implements OnInit {
  recordsPerPage: any;
  toggleMonths = false;
  years: any = [];
  months: any = [];
  theYear = new Date().getFullYear();
  theMonth = moment(new Date()).format('MMM');
  totalAmount = 0;
  productData: any = [];
  openAction = '';
  prevAction = '';
  clicked = 0;

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef | undefined;

  constructor(
    private apiService: ApiService,
    protected global: GlobalService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  url = environment.apiUrl;

  ngOnInit() {
    this.getSettings();
    this.getYears();

    document.addEventListener('click', (e) => {
      if (!this.wrapper?.nativeElement.contains(e.target)) {
        this.toggleMonths = false;
      }
    });
    if (this.theYear && this.theMonth) {
      this.searchGrocery();
    }
  }

  getSettings() {
    this.apiService
      .postData(this.url + 'grocery/settings', {})
      .subscribe((response) => {
        this.recordsPerPage = response.data.perPage;
        this.months = response.data.monthShort;
      });
  }

  getYears() {
    this.apiService
      .postData(this.url + 'grocery/year-list', {})
      .subscribe((response) => {
        this.years = response.data;
      });
  }

  updateMonth(m: string) {
    this.theMonth = m;
  }

  searchGrocery() {
    this.apiService
      .postData(this.url + 'grocery/by-month', {
        year: this.theYear,
        month: this.theMonth,
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.totalAmount = response.data.totalPrice;
          this.productData = response.data.records;
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
        this.searchGrocery();
        this._snackBar.open('Product Created', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-success'],
        });
      }
    });
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
        this.searchGrocery();
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
