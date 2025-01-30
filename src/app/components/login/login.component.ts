import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        const user = users.find(
          (u) => u.username === this.username && u.password === this.password
        );

        if (user) {
          localStorage.setItem('token', user.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      },
      error: (error) => {
        alert('Login failed. Please try again.');
      },
    });
  }
}
