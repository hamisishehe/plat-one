import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileDetails: ProfileDetails | null = null;
  first_name: string = '';
  second_name: string = '';
  last_name: string = '';
  zip_code: string = '';
  city: string = '';
  email: string = '';
  username: string = '';
  phonenumber: string = '';

  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProfile(); // Fetch profile and trigger deposit fetch
  }

  // Get profile data based on user ID
  getData(userId: number): void {
    this.http
      .get<ProfileDetails>(
        `${environment.baseUrl}/profile/show-profile/${userId}`
      ) // Use baseUrl here
      .subscribe(
        (data) => {
          this.profileDetails = data;
          this.first_name = this.profileDetails.fistName;
          this.second_name = this.profileDetails.secondname; // Corrected from fistName to secondname
          this.last_name = this.profileDetails.lastName;
          this.city = this.profileDetails.city;
          this.zip_code = this.profileDetails.zipCode; // Corrected from fistName to zipCode
        },
        (error) => {
          console.error('Error fetching profile details:', error);
        }
      );
  }

  getProfile(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get<UserDetails>(`${environment.baseUrl}/user/profile`, { headers }) // Use baseUrl here
        .subscribe(
          (data) => {
            this.userData = data;
            this.userid = this.userData.id;
            this.username = this.userData.username;
            this.email = this.userData.email;
            this.phonenumber = this.userData.phoneNumber;

            this.getData(this.userid); // Fetch profile details after user data
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }

  updateProfile() {
  }
}

export interface ProfileDetails {
  id: number;
  fistName: string;
  secondname: string; // Corrected from second_name to secondname
  lastName: string;
  city: string;
  zipCode: string; // Corrected from zip_code to zipCode
}