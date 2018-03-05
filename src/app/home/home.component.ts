import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calculateForMonth: number = 6;
  currentMoney: number = 500;
  monthlyNetSalary: number = 1500;
  monthlyAppartmentPrice: number = 400;

  constructor() { }

  ngOnInit() {
  }

}
