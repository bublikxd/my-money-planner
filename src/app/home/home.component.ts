import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calculationForm: FormGroup;

  result: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.calculationForm = this.formBuilder.group({
      calculationLong: 0,
      currentMoney: 0,
      revenue: this.formBuilder.array([this.createRevenueItem()]),
      outgoings: this.formBuilder.array([this.createOutgoingsItem()])
    });
  }

  createRevenueItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: 0
    });
  }

  createOutgoingsItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: 0,
      isLimited: false,
      endDate: null
    });
  }

  addNewRevenueItem() {
    (this.calculationForm.get('revenue') as FormArray).push(this.createRevenueItem());
  }

  deleteRevenueItem(index: number) {
    (this.calculationForm.get('revenue') as FormArray).removeAt(index);
  }

  addNewOutgoingsItem() {
    (this.calculationForm.get('outgoings') as FormArray).push(this.createOutgoingsItem());
  }

  deleteOutgoingsItem(index: number) {
    (this.calculationForm.get('outgoings') as FormArray).removeAt(index);
  }

  calculateForm(formData: any) {
    this.result = formData;
  }

}
