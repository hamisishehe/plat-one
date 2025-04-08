import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  phonenumber: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  successmessage: string = '';
  referralCode: string | null = null;
  loading: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.referralCode = params['ReferralCode'] || null; // Capture the referral code
      console.log('Referral Code:', this.referralCode);
    });
  }
  register() {
    this.loading = true;
    const UserData = {
      username: this.username,
      phonenumber: this.phonenumber,
      email: this.email,
      password: this.password,
    };

    console.log(UserData);

    let apiUrl = environment.baseUrl + '/auth/register'; // Use environment base URL

    if (this.referralCode) {
      apiUrl += `?referralCode=${this.referralCode}`;
    }

    this.http.post(apiUrl, UserData, { responseType: 'text' }).subscribe(
      (response) => {
        if (response === 'Invalid referral code') {
          this.message = 'Invalid referral code';
        } else if (response === 'User Already Exist') {
          this.message = 'User Already Exist';
        } else if (response === 'Registration Successfully') {
          this.successmessage = 'Registration Successfully, please Login';
        }
        this.loading = false;
      },
      (error) => {
        this.message = 'Invalid details';
        this.loading = false;
      }
    );
  }

}
