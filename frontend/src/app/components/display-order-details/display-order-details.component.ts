import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-display-order-details',
  templateUrl: './display-order-details.component.html',
  styleUrls: ['./display-order-details.component.scss']
})
export class DisplayOrderDetailsComponent implements OnInit {
  
  orderAll:any=[];
  headElements = ['OrderID','Type', 'Weight', 'Length', 'Breadth', 'Pickup Address', 'Delivery Address', 'Alternate Contact', 'Estimated Cost', 'Coupon Code', 'Delivery Status', 'Payment Status', 'Tracking ID'];

  constructor(private orderDetails:OrderDetailsService) { }

  ngOnInit(): void {
    this.getDetails();

  }

  getDetails(): any{
    this.orderDetails.getDetails(String(localStorage.getItem('email'))).subscribe((data:any) => {
      data = JSON.stringify(data.ordersAll);
      this.orderAll = JSON.parse(data);
    });
  }

}
