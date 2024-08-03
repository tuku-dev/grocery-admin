import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
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
  addProductForm: FormGroup | any;
  submitted = false;
  formData: any;
  url = environment.apiUrl;
  productId = '';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      tags: [''],
      description: [''],
    });
    console.log(this.data);
    if (this.data.item && this.data.item._id) {
      this.productId = this.data.item._id;
      this.updateFormFields(this.data.item);
    }
  }

  get f() {
    return this.addProductForm.controls;
  }

  updateFormFields(item: any) {
    this.addProductForm = this.fb.group({
      _id: item._id,
      productName: [item.productName, [Validators.required]],
      tags: [item.tags],
      description: [item.description],
    });
  }

  formSubmit() {
    // console.log(this.addProductForm.value);
    this.submitted = true;

    if (this.addProductForm.invalid) return;

    this.formData = this.addProductForm.value;

    if (this.productId === '') {
      this.apiService
        .postModule(this.url + 'product/add', this.formData)
        .subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close({ status: true, response });
          }
        });
    } else {
      this.apiService
        .postModule(this.url + 'product/updateById', this.formData)
        .subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close({ status: true, response });
          }
        });
      console.log(this.formData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }
}
