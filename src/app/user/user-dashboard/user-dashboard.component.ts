import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BalanceDetails, InvestUsdBalance } from '../user-wallet/user-wallet.component';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';
import { PlansDetails, usdProfitBalance } from '../user-stake/user-stake.component';
import { REFbalance } from '../user-referrals/user-referrals.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{



  balanceDetails: BalanceDetails | undefined;
   usdProfitBalance: usdProfitBalance | undefined;
  investUsdBalance: InvestUsdBalance | undefined;
   plansDetails: PlansDetails[] | null = null;
  userData: UserDetails | null = null;
  refBalance: REFbalance | undefined;
  userid: number = 0;


  constructor(private http: HttpClient) {


   }

   ngOnInit() {
    this.getProfile();
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
            console.log(data);
            this.userData = data;

            this.userData = data;
            this.userid = this.userData.id;
            this.getBalance(this.userid);
            this.getUdTBalance(this.userid);
            this.getUsdProfit(this.userid);
            this.getData(this.userid);
            this.refBData(this.userid);


          },
          (error) => {
            console.error('Error fetching user profile', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }


  getData(userId: number): void {
    this.http
      .get<PlansDetails[]>(`${environment.baseUrl}/investments/${userId}`) // Use baseUrl here
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.plansDetails = data;
        },
        (error) => {
          console.error('Error fetching plans details:', error);
        }
      );
  }

  getBalance(userId: number): void {
    this.http
      .get<BalanceDetails>(
        `${environment.baseUrl}/balance/show-balance/${userId}`
      )
      .subscribe(
        (data) => {
          this.balanceDetails = data;
        },
        (error) => {
          console.error('Error fetching balance details:', error);
        }
      );
  }

  getUdTBalance(userId: number): void {
    this.http
      .get<InvestUsdBalance>(
        `${environment.baseUrl}/usdt/show-balance/${userId}`
      )
      .subscribe(
        (data) => {
          this.investUsdBalance = data;
        },
        (error) => {
          console.error('Error fetching ENA balance details:', error);
        }
      );
  }


    getUsdProfit(userId: number): void {
      this.http
        .get<usdProfitBalance>(
          `${environment.baseUrl}/profit/show-balance/${userId}`
        )
        .subscribe(
          (data) => {
            this.usdProfitBalance = data;
          },
          (error) => {
            console.error('Error fetching ENA profit details:', error);
          }
        );
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

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

}
