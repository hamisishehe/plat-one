import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { authGuardGuard } from './auth/auth-guard.guard';
import { UserWalletComponent } from './user/user-wallet/user-wallet.component';
import { UserStakeComponent } from './user/user-stake/user-stake.component';
import { UserReferralsComponent } from './user/user-referrals/user-referrals.component';
import { UserLevel1Component } from './user/user-level1/user-level1.component';
import { UserLevel2Component } from './user/user-level2/user-level2.component';
import { UserLevel3Component } from './user/user-level3/user-level3.component';

export const routes: Routes = [

  {path:'auth/login', component: LoginComponent},
  {path:'auth/register', component: RegisterComponent},


  //user routes
  {path:'', component: UserLayoutComponent, canActivate:[authGuardGuard] ,
    children:[
      {path:'user/user-dashboard', component:UserDashboardComponent, canActivate:[authGuardGuard]},
      {path:'user/user-wallet', component:UserWalletComponent, canActivate:[authGuardGuard]},
      {path:'user/user-stake', component:UserStakeComponent, canActivate:[authGuardGuard]},
      {path:'user/user-referrals', component:UserReferralsComponent, canActivate:[authGuardGuard]},
      {path:'user/user-level1', component:UserLevel1Component, canActivate:[authGuardGuard]},
      {path:'user/user-level2', component:UserLevel2Component, canActivate:[authGuardGuard]},
      {path:'user/user-level3', component:UserLevel3Component, canActivate:[authGuardGuard]},
  ]},

    // Default redirect for empty path
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    // Wildcard route for 404
    { path: '**', redirectTo: '/auth/login' },






];
