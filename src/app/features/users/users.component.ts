import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);

  users = signal<any[]>([]); // Stores users
  selectedUser = signal<any | null>(null); // Tracks selected user

  // Reference the modal component
  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  constructor() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  openModal(user: any) {
    this.selectedUser.set(user);
    if (this.userModal) {
      this.userModal.setUser(user);
    }
  }

  closeModal() {
    this.selectedUser.set(null);
  }
}
