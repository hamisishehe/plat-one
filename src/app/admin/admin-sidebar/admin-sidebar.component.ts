import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-sidebar',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  apptitle: string = 'PlatForm';

  userData: UserDetails | null = null;

  constructor(private http: HttpClient) {}

  appTitel:string ="Platform";

  ngOnInit() {
    this.getProfile();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  getProfile() {
    const token = localStorage.getItem('token');

    if (token) {
      // Set the Authorization header with the Bearer token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      // Make the HTTP GET request to fetch the profile
      this.http
        .get<UserDetails>(`${environment.baseUrl}/user/profile`, {
          headers,
        }) // Use baseUrl here
        .subscribe(
          (data) => {
            this.userData = data;
            console.log(this.userData.username);
          },
          (error) => {
            console.error('Error fetching user profile', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }
}

export interface UserDetails {
  id: number;
  username: string;
  email: string;
  phonenumber: string;
  password: string;
  referralCode: string;
}
