import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BalanceDetails, InvestUsdBalance } from '../user-wallet/user-wallet.component';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';
import { PlansDetails, usdProfitBalance } from '../user-stake/user-stake.component';
import { REFbalance } from '../user-referrals/user-referrals.component';
import { UserChatComponent } from "../user-chat/user-chat.component";

@Component({
  selector: 'app-user-dashboard',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{

  showChat = false;


  cryptoData: any[] = [];
  cryptoSymbols: string[] = [
    'BTC',
    'ETH',
    'USDT',
    'SOL',
    'DOGE',
    'XRP',
    'SUI',
    'PEPE',
    'BNB',
  ];



  balanceDetails: BalanceDetails | undefined;
   usdProfitBalance: usdProfitBalance | undefined;
  investUsdBalance: InvestUsdBalance | undefined;
   plansDetails: PlansDetails[] | null = null;
  userData: UserDetails | null = null;
  refBalance: REFbalance | undefined;
  userid: number = 0;


  constructor(private http: HttpClient) { }



toggleChat() {
  this.showChat = !this.showChat;
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

            this.userData = data;

            this.userData = data;
            this.userid = this.userData.id;
            this.getBalance(this.userid);
            this.getUdTBalance(this.userid);
            this.getUsdProfit(this.userid);
            this.getData(this.userid);
            this.refBData(this.userid);
            this.fetchCryptoData();


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



    fetchCryptoData() {
      const symbols = this.cryptoSymbols.join(',');
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD`;

      this.http.get(url).subscribe(
        (data: any) => {
          this.cryptoData = this.transformData(data);
        },
        (error) => {
          console.error('Error fetching crypto data:', error);
        }
      );
    }

    transformData(data: any) {
      return this.cryptoSymbols.map((symbol) => {
        const info = data.RAW[symbol].USD;
        return {
          name: info.FROMSYMBOL,
          symbol: symbol,
          price: info.PRICE,
          marketCap: info.MKTCAP,
          volume24h: info.TOTALVOLUME24H,
          supply: info.SUPPLY,
          change24h: info.CHANGE24HOUR,
          percentChange: info.CHANGEPCT24HOUR,
          chart: this.generateChartUrl(symbol),
          image: this.getImageUrl(symbol),
        };
      });
    }

    // Function to generate the chart URL
    generateChartUrl(symbol: string): string {
      return `https://images.cryptocompare.com/sparkchart/${symbol}/USD/latest.png`; // Chart image URL
    }

    // Function to get the icon URL
    getImageUrl(symbol: string): string {
      return `https://www.cryptocompare.com/media/${this.getIconId(
        symbol
      )}.png?width=25`; // Icon image URL
    }

    // Function to map symbols to their respective image IDs
    getIconId(symbol: string): string {
      const iconIds: { [key: string]: string } = {
        BTC: '37746251/btc',
        ETH: '37746238/eth',
        USDT: '34835941/usdc',
        SOL: '37747734/sol',
        DOGE: '37746339/doge',
        XRP: '38553096/xrp',
        SUI: '44082045/sui',
        PEPE: '44082118/pepe',
        BNB: '40485170/bnb',
        // Add more mappings as needed
      };
      return iconIds[symbol] || symbol.toLowerCase(); // Default to lowercase if not found
    }


  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

}
