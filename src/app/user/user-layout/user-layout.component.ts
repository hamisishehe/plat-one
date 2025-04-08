import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BottomnavigationComponent } from "../bottomnavigation/bottomnavigation.component";
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UserDetails } from '../../user-model/user-model.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, RouterLink, RouterModule, HttpClientModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit{

  private inactivityTime: any;
  private readonly inactivityLimit = 300000; // 5 minutes in milliseconds

  constructor(private router: Router) {}

  ngOnInit() {
    this.resetInactivityTimer();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  onUserActivity() {
    this.resetInactivityTimer();
  }

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTime);
    this.inactivityTime = setTimeout(() => {
      this.clearToken();
      window.location.href = '/login';
    }, this.inactivityLimit);
  }

  private clearToken() {
    localStorage.removeItem('token'); // Clear the token from localStorage
    console.log('User inactive. Token cleared.');
  }
}
