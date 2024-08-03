import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import moment from 'moment';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';

export interface DialogData {
  title: string;
  item: any | undefined;
}

export interface groceryData {
  _id: string;
  productId: string;
  dateOfPurchase: string;
  pricePerUnit: number;
  unit: string;
  quantity: number;
  totalPrice: number;
  active: boolean;
  deleted: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  productData: {
    _id: string;
    productName: string;
    description: string;
    tags: string;
    active: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  slno: 1;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  addGroceryForm: FormGroup | any;
  submitted = false;
  formData: any;
  url = environment.apiUrl;
  groceryId = '';
  todayDate = moment(new Date()).format('YYYY-MM-DD');
  keyword = 'name';
  productData: any = [];
  productName: string = '';
  toggleAutoComplete: boolean = false;
  currentFocus: number = -1;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.addGroceryForm = this.fb.group({
      productId: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      totalPrice: ['', [Validators.required]],
      pricePerUnit: [''],
      dateOfPurchase: [this.todayDate],
      description: [''],
    });
    // console.log(this.data);
    if (this.data.item && this.data.item._id) {
      this.updateFormFields(this.data.item);
    }
  }

  get f() {
    return this.addGroceryForm.controls;
  }

  updateFormFields(item: groceryData) {
    this.groceryId = item._id;
    this.selectEvent(item.productData);

    this.addGroceryForm = this.fb.group({
      _id: item._id,
      productId: [item.productId, [Validators.required]],
      unit: [item.unit, [Validators.required]],
      quantity: [item.quantity, [Validators.required]],
      totalPrice: [item.totalPrice, [Validators.required]],
      pricePerUnit: [item.pricePerUnit],
      dateOfPurchase: [moment(item.dateOfPurchase).format('YYYY-MM-DD')],
      description: [item.description],
    });
  }

  onChangeSearch(event: KeyboardEvent) {
    if (this.productName) {
      this.apiService
        .postModule(this.url + 'product/getProductByName', {
          name: this.productName,
        })
        .subscribe((response) => {
          this.productData = response.data;
          this.toggleAutoComplete = this.productData.length > 0;
        });
    }

    if (event.key === 'ArrowDown') {
      this.currentFocus = (this.currentFocus + 1) % this.productData.length;
    } else if (event.key === 'ArrowUp') {
      this.currentFocus =
        (this.currentFocus - 1 + this.productData.length) %
        this.productData.length;
    } else if (event.key === 'Enter' && this.currentFocus >= 0) {
      this.selectEvent(this.productData[this.currentFocus]);
      return;
    }
  }

  selectEvent(item: any) {
    this.addGroceryForm.controls.productId.setValue(item._id);
    this.productName = item.productName;
    this.toggleAutoComplete = false;
    this.currentFocus = -1; // Reset the focus index
  }

  onBlur(): void {
    setTimeout(() => {
      this.toggleAutoComplete = false;
    }, 100); // Delay to allow click event to register
  }

  calculate() {
    let formValues = this.addGroceryForm.value;
    let unit = formValues.unit;
    let qty = Number(formValues.quantity);
    let total = Number(formValues.totalPrice);
    let unitPrice = Number(formValues.pricePerUnit);

    if (unit && qty) {
      if (total) {
        unitPrice = total / qty;
        this.addGroceryForm.controls.pricePerUnit.setValue(unitPrice);
      } else if (unitPrice) {
        total = unitPrice * qty;
        this.addGroceryForm.controls.totalPrice.setValue(total);
      }
    }
  }

  formSubmit() {
    this.submitted = true;

    if (this.addGroceryForm.invalid) return;
    // console.log(this.addGroceryForm.value);

    this.formData = this.addGroceryForm.value;
    this.formData.dateOfPurchase = moment(this.formData.dateOfPurchase).startOf(
      'day'
    );
    if (this.groceryId === '') {
      this.apiService
        .postModule(this.url + 'grocery/add', this.formData)
        .subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close({ status: true, response });
          }
        });
    } else {
      this.apiService
        .postModule(this.url + 'grocery/updateById', this.formData)
        .subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close({ status: true, response });
          }
        });
      // console.log(this.formData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }
}
