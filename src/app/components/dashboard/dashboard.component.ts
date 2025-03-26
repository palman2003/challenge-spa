
import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  users: any[] = [];
  loading: boolean = true;
  newUser = { username: '', password: '', role: 'User' };
  apiUrl = 'https://spa-backend-ntdb.onrender.com/users';

  currentUser: any = null;

  constructor(private http: HttpClient, private router:Router) {} 

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.loadUsers();
    }
  }

  loadUsers() {
    this.loading = true;
    this.http.get<any[]>(`${this.apiUrl}?role=${this.currentUser.role}&username=${this.currentUser.username}`)
      .subscribe(data => {
        this.users = Array.isArray(data) ? data : [data];
        this.loading = false;
      });
  }

  addUser() {
    this.http.post(this.apiUrl, this.newUser)
      .subscribe(() => {
        this.newUser = { username: '', password: '', role: 'User' };
        this.loadUsers();
      });
  }

  deleteUser(userId: string) {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
      this.users = this.users.filter(user => user._id !== userId); 
    });
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);

}
}
  