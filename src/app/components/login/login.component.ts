import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [ HttpClientModule,FormsModule,CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username='';
  password='';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:5000/login';
  constructor(private router: Router, private http: HttpClient) {}
  login() {
    if (!this.username || !this.password) {
      alert("Please enter username and password");
      return;
    }

    
    this.http.post<{ success: boolean; user?: any }>(this.apiUrl, { username: this.username, password: this.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.router.navigate(['/dashboard']); 
        } else {
          this.errorMessage = 'Invalid credentials!';
        }
      }, error => {
        console.error("Login Error:", error);
        this.errorMessage = 'Login failed. Please try again.';
      });

}
}
