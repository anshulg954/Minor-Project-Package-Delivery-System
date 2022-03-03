import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetailsForm!: FormGroup;
  isEstdCost: boolean = false;
  estdCost: string = '0';

  constructor(private orderService: OrderDetailsService) {}

  ngOnInit(): void {
    this.orderDetailsForm = this.createDetailsGroup();
    this.isEstdCost = localStorage.getItem('estdCost') ? true : false;
    this.estdCost = localStorage.getItem('estdCost') ? String(localStorage.getItem('estdCost')) : '0'; 
  }

  createDetailsGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(String(localStorage.getItem('email')), [Validators.required]),
      type: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      breadth: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
      pAddress: new FormControl('', [Validators.required]),
      dAddress: new FormControl('', [Validators.required]),
      altContact: new FormControl('', [Validators.required]),
      couponCode: new FormControl(''),
    });
  }
  onMakeOrder(): void {
    this.orderService
      .createDetails(this.orderDetailsForm.value)
      .subscribe(
        (msg) => {
          console.log(msg);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
