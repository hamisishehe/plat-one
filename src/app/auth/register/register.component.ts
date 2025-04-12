import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  countryCode: string = '+61'; // default e.g. Tanzania

  countries = [
    { name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫' },
    { name: 'Albania', dialCode: '+355', flag: '🇦🇱' },
    { name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
    { name: 'Andorra', dialCode: '+376', flag: '🇦🇩' },
    { name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
    { name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
    { name: 'Armenia', dialCode: '+374', flag: '🇦🇲' },
    { name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
    { name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿' },
    { name: 'Bahamas', dialCode: '+1-242', flag: '🇧🇸' },
    { name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
    { name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
    { name: 'Barbados', dialCode: '+1-246', flag: '🇧🇧' },
    { name: 'Belarus', dialCode: '+375', flag: '🇧🇾' },
    { name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
    { name: 'Belize', dialCode: '+501', flag: '🇧🇿' },
    { name: 'Benin', dialCode: '+229', flag: '🇧🇯' },
    { name: 'Bhutan', dialCode: '+975', flag: '🇧🇹' },
    { name: 'Bolivia', dialCode: '+591', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', dialCode: '+387', flag: '🇧🇦' },
    { name: 'Botswana', dialCode: '+267', flag: '🇧🇼' },
    { name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { name: 'Brunei', dialCode: '+673', flag: '🇧🇳' },
    { name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
    { name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫' },
    { name: 'Burundi', dialCode: '+257', flag: '🇧🇮' },
    { name: 'Cambodia', dialCode: '+855', flag: '🇰🇭' },
    { name: 'Cameroon', dialCode: '+237', flag: '🇨🇲' },
    { name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { name: 'Chad', dialCode: '+235', flag: '🇹🇩' },
    { name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
    { name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
    { name: 'Congo', dialCode: '+242', flag: '🇨🇬' },
    { name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷' },
    { name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
    { name: 'Cuba', dialCode: '+53', flag: '🇨🇺' },
    { name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
    { name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
    { name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
    { name: 'Djibouti', dialCode: '+253', flag: '🇩🇯' },
    { name: 'Dominican Republic', dialCode: '+1-809', flag: '🇩🇴' },
    { name: 'Ecuador', dialCode: '+593', flag: '🇪🇨' },
    { name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { name: 'El Salvador', dialCode: '+503', flag: '🇸🇻' },
    { name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
    { name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
    { name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
    { name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { name: 'Gabon', dialCode: '+241', flag: '🇬🇦' },
    { name: 'Gambia', dialCode: '+220', flag: '🇬🇲' },
    { name: 'Georgia', dialCode: '+995', flag: '🇬🇪' },
    { name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
    { name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
    { name: 'Guatemala', dialCode: '+502', flag: '🇬🇹' },
    { name: 'Guinea', dialCode: '+224', flag: '🇬🇳' },
    { name: 'Haiti', dialCode: '+509', flag: '🇭🇹' },
    { name: 'Honduras', dialCode: '+504', flag: '🇭🇳' },
    { name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
    { name: 'Iceland', dialCode: '+354', flag: '🇮🇸' },
    { name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
    { name: 'Iran', dialCode: '+98', flag: '🇮🇷' },
    { name: 'Iraq', dialCode: '+964', flag: '🇮🇶' },
    { name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
    { name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
    { name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { name: 'Jamaica', dialCode: '+1-876', flag: '🇯🇲' },
    { name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
    { name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿' },
    { name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
    { name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
    { name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬' },
    { name: 'Laos', dialCode: '+856', flag: '🇱🇦' },
    { name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
    { name: 'Lebanon', dialCode: '+961', flag: '🇱🇧' },
    { name: 'Lesotho', dialCode: '+266', flag: '🇱🇸' },
    { name: 'Liberia', dialCode: '+231', flag: '🇱🇷' },
    { name: 'Libya', dialCode: '+218', flag: '🇱🇾' },
    { name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
    { name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
    { name: 'Madagascar', dialCode: '+261', flag: '🇲🇬' },
    { name: 'Malawi', dialCode: '+265', flag: '🇲🇼' },
    { name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
    { name: 'Maldives', dialCode: '+960', flag: '🇲🇻' },
    { name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
    { name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
    { name: 'Mauritania', dialCode: '+222', flag: '🇲🇷' },
    { name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
    { name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { name: 'Moldova', dialCode: '+373', flag: '🇲🇩' },
    { name: 'Monaco', dialCode: '+377', flag: '🇲🇨' },
    { name: 'Mongolia', dialCode: '+976', flag: '🇲🇳' },
    { name: 'Montenegro', dialCode: '+382', flag: '🇲🇪' },
    { name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
    { name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
    { name: 'Myanmar', dialCode: '+95', flag: '🇲🇲' },
    { name: 'Namibia', dialCode: '+264', flag: '🇳🇦' },
    { name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
    { name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
    { name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮' },
    { name: 'Niger', dialCode: '+227', flag: '🇳🇪' },
    { name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
    { name: 'North Korea', dialCode: '+850', flag: '🇰🇵' },
    { name: 'North Macedonia', dialCode: '+389', flag: '🇲🇰' },
    { name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
    { name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
    { name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
    { name: 'Palestine', dialCode: '+970', flag: '🇵🇸' },
    { name: 'Panama', dialCode: '+507', flag: '🇵🇦' },
    { name: 'Papua New Guinea', dialCode: '+675', flag: '🇵🇬' },
    { name: 'Paraguay', dialCode: '+595', flag: '🇵🇾' },
    { name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
    { name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
    { name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
    { name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
    { name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
    { name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
    { name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
    { name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
    { name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { name: 'Senegal', dialCode: '+221', flag: '🇸🇳' },
    { name: 'Serbia', dialCode: '+381', flag: '🇷🇸' },
    { name: 'Seychelles', dialCode: '+248', flag: '🇸🇨' },
    { name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱' },
    { name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
    { name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
    { name: 'Somalia', dialCode: '+252', flag: '🇸🇴' },
    { name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
    { name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
    { name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { name: 'Syria', dialCode: '+963', flag: '🇸🇾' },
    { name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
    { name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯' },
    { name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
    { name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
    { name: 'Togo', dialCode: '+228', flag: '🇹🇬' },
    { name: 'Trinidad and Tobago', dialCode: '+1-868', flag: '🇹🇹' },
    { name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
    { name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
    { name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
    { name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
    { name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
    { name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿' },
    { name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
    { name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
    { name: 'Yemen', dialCode: '+967', flag: '🇾🇪' },
    { name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
  ];

  getFullPhoneNumber(): string {
    return this.countryCode + this.phonenumber;
  }

  username: string = '';
  phonenumber: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  successmessage: string = '';
  referralCode: string | null = null;
  loading: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.referralCode = params['ReferralCode'] || null; // Capture the referral code
      console.log('Referral Code:', this.referralCode);
    });

    console.log('Full Phone Number:', this.getFullPhoneNumber());
  }
  register() {
    this.loading = true;
    const UserData = {
      username: this.username,
      phonenumber: this.phonenumber,
      email: this.email,
      password: this.password,
    };

    console.log(UserData);

    let apiUrl = environment.baseUrl + '/auth/register'; // Use environment base URL

    if (this.referralCode) {
      apiUrl += `?referralCode=${this.referralCode}`;
    }

    this.http.post(apiUrl, UserData, { responseType: 'text' }).subscribe(
      (response) => {
        if (response === 'Invalid referral code') {
          this.message = 'Invalid referral code';
        } else if (response === 'User Already Exist') {
          this.message = 'User Already Exist';
        } else if (response === 'Registration Successfully') {
          this.successmessage = 'Registration Successfully, please Login';
        }
        this.loading = false;
      },
      (error) => {
        this.message = 'Invalid details';
        this.loading = false;
      }
    );
  }

}
