import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';
import { UserInterface } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);

  users = signal<UserInterface[]>([]); // Stores users
  selectedUser = signal<UserInterface | null>(null); // Tracks selected user

  // Reference the modal component
  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  constructor() {
    this.http.get<UserInterface[]>('http://localhost:3000/users').subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  openModal(user: UserInterface) {
    this.selectedUser.set(user);
    if (this.userModal) {
      this.userModal.setUser(user);
    }
  }

  closeModal() {
    this.selectedUser.set(null);
  }
}
