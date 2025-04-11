import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { InvestUsdBalance } from '../user-wallet/user-wallet.component';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-stake',
  imports: [HttpClientModule, HttpClientModule, CommonModule,FormsModule],
  templateUrl: './user-stake.component.html',
  styleUrl: './user-stake.component.css'
})
export class UserStakeComponent  implements OnInit{

  isPlanActive: boolean = true;
  plansDetails: PlansDetails[] | null = null;
  investUsdBalance: InvestUsdBalance | undefined;
  usdProfitBalance: usdProfitBalance | undefined;
  userData: UserDetails | null = null;


  userid: number = 0;
  message:string ='';



  constructor(private http:HttpClient){}

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
            this.userData = data;

            this.userData = data;
            this.userid = this.userData.id;

            this.getUdTBalance(this.userid);
            this.getData(this.userid);
            this.getUsdProfit(this.userid);
          },
          (error) => {
            console.error('Error fetching user profile', error);
          }
        );
    } else {
      console.error('No token found');
    }
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

    getData(userId: number): void {
      this.http
        .get<PlansDetails[]>(`${environment.baseUrl}/investments/${userId}`) // Use baseUrl here
        .subscribe(
          (data) => {

            this.plansDetails = data;
          },
          (error) => {
            console.error('Error fetching plans details:', error);
          }
        );
    }

    invest() {


      // Prepare user form data for investment
      let userForm = {
        userId: this.userid,
        amount: this.investUsdBalance?.availableBalance,
        package: "COMMON",
      };

      // Send investment request
      this.http
        .post(`${environment.baseUrl}/investments/invest`, userForm, {
          responseType: 'text',
        })
        .subscribe(
          (response) => {
            if (response === 'USD token balance not found for user.') {
              this.message = response;
              console.log(response);

            } else if (
              response === 'Insufficient USD balance for this investment.'
            ) {
              this.message = response;
              console.log(response);

            } else {
              this.message = response;
              window.location.reload();

              console.log(response);

            }


          },
          (error) => {

            console.log(error);
          }
        );
    }

    get hasRunning(): boolean {
      return this.plansDetails?.some(plan => plan.status === 'RUNNING') ?? false;
    }

}


export interface PlansDetails {
  id: number;
  maturityDate: string;
  amount: number;
  startDate: string;
  investmentPackage: string;
  status: string;
}


export interface usdProfitBalance {
  id: number;
  totalProfit: number;
  lastUpdated: number;
}