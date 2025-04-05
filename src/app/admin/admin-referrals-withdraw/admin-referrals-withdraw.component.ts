import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../admin-sidebar/admin-sidebar.component';
import { environment } from '../../../environments/environment';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-admin-referrals-withdraw',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './admin-referrals-withdraw.component.html',
  styleUrl: './admin-referrals-withdraw.component.css'
})
export class AdminReferralsWithdrawComponent {

  refwithdrawDetails: WithdrawDetails[] | null = null;
  refWithdrawDetails: any[] = [];
  userData: UserDetails | null = null;
  userid: number = 0; // Initial default value to avoid null issues

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData(); // Fetch profile and trigger withdraw data fetch
  }

  getData(): void {
    this.http
      .get<any>(`${environment.baseUrl}/ref-withdraw/all-with-user`)
      .subscribe(
        (data) => {
          this.refWithdrawDetails = data;
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.initializeTable();
        },
        (error) => {
          console.error('Error fetching ref withdraw details:', error);
        }
      );
  }

  verify(id: number) {
    const FormData = {
      wid: id,
    };
    this.http
      .post(`${environment.baseUrl}/ref-withdraw/confirm`, FormData, {
        responseType: 'text',
      }) // Use baseUrl
      .subscribe(
        (response) => {
          if (response == 'Successfully') {

          }

          window.location.reload();
        },
        (error) => {

        }
      );
  }

  initializeTable(): void {
    setTimeout(() => {
      let datatable = new DataTable('#search-table', {
        sortable: false,
        paging: false,
      });
      console.log('Table initialized');
    }, 100);
  }
}

export interface WithdrawDetails {
  id: number;
  transactionId: string;
  amount: number;
  status: string;
  withdrawalDate: string;
  phoneNumber: string;
  address: string;
}