import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);

  // Create a signal to store users data
  users = signal<any[]>([]);

  constructor() {
    // Fetch data from the mock server
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (data) => {
        // Set the data to the signal
        this.users.set(data);
        console.log(data); // Log the fetched data for testing
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
}
