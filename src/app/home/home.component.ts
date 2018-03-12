import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calculationForm: FormGroup;

  result: any = null;
  revenueSum: number = 0;
  outgoingsSum: number = 0;

  calculationPrognose: number[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.calculationForm = this.formBuilder.group({
      calculationLong: 1,
      currentMoney: 1000,
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
    const revenueArr: number[] = [];
    formData.revenue.forEach(revenueItem => {
      revenueArr.push(revenueItem.amount);
    });
    const outgoingsArr: number[] = [];
    formData.outgoings.forEach(outgoingsItem => {
      outgoingsArr.push(outgoingsItem.amount);
    });
    this.revenueSum = this.getSumOfArray(revenueArr);
    this.outgoingsSum = this.getSumOfArray(outgoingsArr);
    this.calculateLongResult();
  }

  getSumOfArray(valueArray: any[]): number {
    return valueArray.reduce((a, b) => a + b, 0);
  }

  calculateLongResult() {
    const bankBalance: number = this.result.currentMoney;
    const months: number = this.result.calculationLong;
    for (let i = 0; i < months; i++) {
      if (i === 0) {
        this.calculationPrognose[i] = (bankBalance + (this.revenueSum - this.outgoingsSum));
      } else {
        this.calculationPrognose[i] = (this.calculationPrognose[i - 1]) + (this.revenueSum - this.outgoingsSum);
      }
    }
  }

  resetFormData() {
    this.calculationForm.reset();
  }

}
