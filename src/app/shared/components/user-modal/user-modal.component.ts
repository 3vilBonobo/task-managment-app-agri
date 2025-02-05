import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent {
  private http = inject(HttpClient);

  // Reactive signal for the user data
  user = signal<any | null>(null);

  // Function to set the user data
  setUser(userData: any) {
    this.user.set(userData);
  }

  // Function to close the modal and emit the close event
  closeModal() {
    this.user.set(null);
  }

  // Sends updated user info to the mock server
  updateUser() {
    if (!this.user()) return;

    this.http
      .put(`http://localhost:3000/users/${this.user().id}`, this.user())
      .subscribe({
        next: () => {
          alert('User info updated successfully!');
          this.closeModal();
        },
        error: (err) => console.error('Error updating user:', err),
      });
  }
}
