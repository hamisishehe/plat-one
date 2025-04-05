import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../user-model/user-model.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-level2',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './user-level2.component.html',
  styleUrl: './user-level2.component.css'
})
export class UserLevel2Component implements OnInit{




  refData: UserDetails[] | null = null;
  refData2: UserDetails[][] = [];
  userData: UserDetails | null = null;
  userid: number = 0;


  constructor(private http:HttpClient){}

  ngOnInit(): void {
     this.getProfile();
  }

  getData(userId: number): void {
    this.http
      .get<UserDetails[]>(
        `${environment.baseUrl}/referrals/show-referrals/${userId}`
      ) // Use baseUrl here
      .subscribe(
        (data) => {
          this.refData = data;
          console.log('====================================');
          console.log(data);
          console.log('====================================');
        },
        (error) => {
          console.error('Error fetching plans details:', error);
        }
      );
  }

  getData2(userId: number): void {
    this.http
      .get<UserDetails[][]>(`${environment.baseUrl}/user/referrals/${userId}`) // Use baseUrl here
      .subscribe(
        (data) => {
          this.refData2 = data;
        },
        (error) => {
          console.error('Error fetching plans details:', error);
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
            this.getData2(this.userid);
            this.getData(this.userid);
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }

}
