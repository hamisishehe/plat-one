import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
[x: string]: any;
  title = 'platform';


  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');

    window.location.href = '/auth/login';
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
