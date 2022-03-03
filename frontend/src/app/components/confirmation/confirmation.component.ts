import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  estdCost: string = '0';
  constructor(private orderService:OrderDetailsService) { }

  ngOnInit(): void {
    this.estdCost = localStorage.getItem('estdCost') ? String(localStorage.getItem('estdCost')) : '0';
  }
  confirmOrder(): void {
    this.orderService
      .processOrder(String(localStorage.getItem('orderID')), String(localStorage.getItem('email')))
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
