import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-referrals',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-referrals.component.html',
  styleUrl: './user-referrals.component.css'
})
export class UserReferralsComponent implements OnInit {

  selectedTab: string = 'direct';

  refData: UserDetails[] | null = null;
  refData2: UserDetails[][] = [];
  userData: UserDetails | null = null;
  refBalance: REFbalance | undefined;
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
            this.refBData(this.userid);
          },
          (error) => {
            console.error('Error fetching user profile:', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }

  refBData(userId: number): void {
    this.http
      .get<REFbalance>(
        `${environment.baseUrl}/balance/show-ref-balance/${userId}`
      )
      .subscribe(
        (data) => {
          this.refBalance = data;
        },
        (error) => {
          console.error('Error fetching ENA balance details:', error);
        }
      );
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }




  copyReferralUrl(referralUrl: string): void {
    navigator.clipboard
      .writeText(referralUrl)
      .then(() => {
        alert('Referral URL copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }




}


export interface REFbalance {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}