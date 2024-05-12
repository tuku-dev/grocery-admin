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
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../../../env/environment';
import { ApiService } from '../../../api.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './add.component.modal.html',
  styleUrl: './add.component.scss',
})
export class AddComponentModal implements OnInit {
  addProductForm: FormGroup | any;
  submitted = false;
  formData: any;
  url = environment.apiUrl;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponentModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    console.log(this.data);

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
    console.log(this.formData);

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
