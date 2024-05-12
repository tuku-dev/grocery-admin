import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  addProductForm: FormGroup | any;
  submitted = false;
  formData: any;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.addProductForm.value);
    this.submitted = true;

    if (this.addProductForm.invalid) return;

    this.formData = this.addProductForm.value;
    console.log(this.formData);
  }
}
