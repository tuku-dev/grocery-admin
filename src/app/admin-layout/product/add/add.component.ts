import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';

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

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      tags: [''],
      description: [''],
    });
  }

  get f() {
    return this.addProductForm.controls;
  }

  formSubmit() {
    // console.log(this.addProductForm.value);
    this.submitted = true;

    if (this.addProductForm.invalid) return;

    this.formData = this.addProductForm.value;

    this.apiService
      .postData(this.url + 'product/add', this.formData)
      .subscribe((response) => {
        if (response.status === 200) {
          this.dialogRef.close({ status: true, response });
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close({ status: false });
  }
}
