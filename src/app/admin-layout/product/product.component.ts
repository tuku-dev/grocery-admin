import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../env/environment';
import { ApiService } from '../../api.service';
import { GlobalService } from '../../global.service';
import { AddComponent } from './add/add.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-product',
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
    MatIconModule,
  ],
  providers: [ApiService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productData: any = [Object];
  totalRecord = 0;
  page = 1;
  recordsPerPage = 10;
  pager = 0;
  fetchData: any;
  filter = '';
  openAction = '';
  prevAction = '';
  clicked = 0;

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

  searchProduct() {
    this.fetchData.productName = this.filter;
    this.fetchApi(this.fetchData);
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
