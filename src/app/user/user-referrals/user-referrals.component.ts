import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-referrals',
  imports: [HttpClientModule],
  templateUrl: './user-referrals.component.html',
  styleUrl: './user-referrals.component.css'
})
export class UserReferralsComponent implements OnInit {

  ngOnInit(): void {
    console.log("loading");
    throw new Error('Method not implemented.');
  }

}
