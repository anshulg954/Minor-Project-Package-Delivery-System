import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-show-customer-feedbacks',
  templateUrl: './display-customer-feedbacks.component.html',
  styleUrls: ['./display-customer-feedbacks.component.scss']
})
export class DisplayCustomerFeedbacks implements OnInit {

  feedbacks:any=[];
  headElements = ['OrderID','Submitted By','Email','Subject','Message'];

  constructor(private fbService:FeedbackService) {

   }

  ngOnInit(): void {
    this.getDetails();
  }
  getDetails(): any{
    this.fbService.getDetails(String(localStorage.getItem('email'))).subscribe((data:any) => {
      data = JSON.stringify(data.feedbacks);
      this.feedbacks = JSON.parse(data);
    });
  }
}
