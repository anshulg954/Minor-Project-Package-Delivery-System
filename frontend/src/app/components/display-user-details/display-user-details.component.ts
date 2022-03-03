import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-display-user-details',
  templateUrl: './display-user-details.component.html',
  styleUrls: ['./display-user-details.component.scss']
})
export class DisplayUserDetailsComponent implements OnInit {
  info:any;
  headElements = ['User ID', 'Name', 'Email', 'Contact', 'Country', 'City', 'State', 'Zip', 'Address',];


  constructor(private userDetails:UserDetailsService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): any{
    this.userDetails.getDetails(String(localStorage.getItem('email'))).subscribe((data:any) => {
      data = JSON.stringify(data.userCombined);
      this.info = [JSON.parse(data)];
    });
  }
}
