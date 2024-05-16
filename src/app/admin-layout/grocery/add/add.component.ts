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
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';
import moment from 'moment';

export interface DialogData {
  title: string;
  item: any | undefined;
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
  todayDate = moment(new Date()).format('YYYY-mm-DD');

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    console.log(moment(new Date()).format('YYYY-mm-DD'));

    this.addGroceryForm = this.fb.group({
      productName: [''],
      unit: [''],
      quantity: [''],
      totalPrice: [''],
      pricePerUnit: [''],
      dateOfPurchase: [this.todayDate],
      description: [''],
    });
  }

  get f() {
    return this.addGroceryForm.controls;
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
    // console.log(this.addProductForm.value);
    this.submitted = true;

    if (this.addGroceryForm.invalid) return;

    this.formData = this.addGroceryForm.value;

    if (this.groceryId === '') {
      // this.apiService
      //   .postData(this.url + 'product/add', this.formData)
      //   .subscribe((response) => {
      //     if (response.status === 200) {
      //       this.dialogRef.close({ status: true, response });
      //     }
      //   });
    } else {
      // this.apiService
      //   .postData(this.url + 'product/updateById', this.formData)
      //   .subscribe((response) => {
      //     if (response.status === 200) {
      //       this.dialogRef.close({ status: true, response });
      //     }
      //   });
      // console.log(this.formData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }
}
