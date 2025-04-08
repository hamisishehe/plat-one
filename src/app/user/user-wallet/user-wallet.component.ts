import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-wallet',
  imports: [HttpClientModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-wallet.component.html',
  styleUrl: './user-wallet.component.css'
})
export class UserWalletComponent  implements OnInit{

  isOpen = false;
  isSendOpen = false;
  isWithdrawOpen = false;
  isBottomSheetOpen = false;
  success_withdraw_message:string ='';
  error_withdraw_message:string ='';


  amount:string="";
  swap_amount:string="";
  address: string = '';
  phonenumber: string = '';
  gateaway: string = '';
  username: string = '';
  choose_withdraw : string ='';
  withdraw_amount : string ='';
  withdraw_address : string ='';

  balanceDetails: BalanceDetails | undefined;
  investUsdBalance: InvestUsdBalance | undefined;
  userData: UserDetails | null = null;
  depositDetails: DepositDetails[] | null = null;
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

            this.getData(this.userid);
            this.getBalance(this.userid);
            this.getUdTBalance(this.userid);
          },
          (error) => {
            console.error('Error fetching user profile', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }


   deposit(){


    const FormData = {
      userId: this.userData?.id,
      amount: this.amount,
      trans_id: "",
      gate_away: this.gateaway,
      address: this.address,
      phonenumber: this.phonenumber,
      username: this.userData?.username,
    };


    this.http
      .post(`${environment.baseUrl}/deposits/make`, FormData, {
        responseType: 'text',
      }) // Use baseUrl
      .subscribe(
        (response) => {
          if (response == 'Successfully') {

            this.isBottomSheetOpen = true;
            this.isOpen = false;

          }

          this.amount = '';
        },
        (error) => {

        }
      );




   }



   sendToWork(){

    const userForm = {
      userId: this.userData?.id,
      usdAmount: this.swap_amount,
    };

    this.http
      .post(`${environment.baseUrl}/usdt/swap`, userForm, {
        // Use baseUrl here
        responseType: 'text',
      })// Use baseUrl
      .subscribe(
        (response) => {
          if (response === 'Balance not found for user.') {

          } else if (response === 'Insufficient balance for this swap.') {

          } else {

          }

          console.log('====================================');
          console.log(response);
          console.log('====================================');

          this.amount = '';
        },
        (error) => {

        }
      );




   }

   getData(userId: number): void {
    this.http
      .get<DepositDetails[]>(`${environment.baseUrl}/deposits/user/${userId}`) // Use baseUrl here
      .subscribe(
        (data) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.depositDetails = data;
        },
        (error) => {
          console.error('Error fetching deposit details:', error);
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


  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  withdraw() {
    let randomNumber = this.getRandomInt(10000000, 99999999);

    if (this.userData?.id == null) {
      window.location.href = '/user/user-dashboard';
    }


    if (this.choose_withdraw === "daily") {
      const FormData = {
        userId: this.userData?.id,
        amount: this.withdraw_amount,
        transactionId: "",
        phonenumber: this.phonenumber,
        wallet: this.address,
        withdrawmethod: this.gateaway,
      };

      this.http
        .post(`${environment.baseUrl}/withdraw/create`, FormData, {
          responseType: 'text',
        }) // Use baseUrl here
        .subscribe(
          (response) => {
            if (response == 'Profit record not found.') {

              this.error_withdraw_message = response;

            } else if (response == 'Insufficient profit balance.') {
              this.error_withdraw_message = response;

            } else {
              this.success_withdraw_message = response;
            }

            this.withdraw_amount = '';
          },
          (error) => {

          }
        );

    }

    else if (this.choose_withdraw === "team") {

      const FormData = {
        userId: this.userData?.id,
        amount: this.withdraw_amount,
        transactionId: "",
        phonenumber: this.phonenumber,
        wallet: this.address,
        withdrawmethod: this.gateaway,
      };

      this.http
        .post(`${environment.baseUrl}/ref-withdraw/create`, FormData, {
          responseType: 'text',
        }) // Use baseUrl here
        .subscribe(
          (response) => {
            if (response == 'Profit record not found.') {

              this.error_withdraw_message = response;

            } else if (response == 'Insufficient profit balance.') {
              this.error_withdraw_message = response;

            } else {
              this.success_withdraw_message = response;
            }

            this.withdraw_amount = '';
          },
          (error) => {

          }
        );

    }
    else{

    }

  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }



  openSendModal() {
    this.isSendOpen = true;
  }

  closeSendModal() {
    this.isSendOpen = false;
  }


  openWithdraw() {
    this.isWithdrawOpen = true;
  }

  closeopenWithdraw() {
    this.isWithdrawOpen = false;
  }

  openBottomSheet() {
    this.isBottomSheetOpen = true;
  }

  closeBottomSheet() {
    this.isBottomSheetOpen = false;
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


export interface DepositDetails {
  id: number;
  transactionId: string;
  amount: number;
  status: string;
  createdAt: string;
  updated_at: string;
}


export interface BalanceDetails {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}


export interface InvestUsdBalance {
  id: number;
  availableBalance: number;
  lockedBalance: number;
}