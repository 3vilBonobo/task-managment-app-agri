import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);

  users = signal<any[]>([]); // Stores users
  selectedUser = signal<any | null>(null); // Tracks selected user

  // We reference the modal component
  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  constructor() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  // Function to open the modal and set the selected user
  openModal(user: any) {
    this.selectedUser.set(user);
    if (this.userModal) {
      this.userModal.setUser(user); // Set the user in the modal using the function
    }
  }

  // Function to close the modal (from the modal's event)
  closeModal() {
    this.selectedUser.set(null);
  }
}
