import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-chat',
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent {

  userId = 1;
  adminId = 999;
  message = '';
  messages: any[] = [];

  constructor(private http: HttpClient) {
    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>(`${environment.baseUrl}/chat/history?userId=${this.userId}&adminId=${this.adminId}`)
      .subscribe(data => this.messages = data);
  }

  sendMessage() {
    const payload = {
      senderId: this.userId,
      receiverId: this.adminId,
      message: this.message
    };

    this.http.post(`${environment.baseUrl}/chat/send`, payload).subscribe(() => {
      this.message = '';
      this.loadMessages();
    });
  }

}
