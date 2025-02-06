import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent {
  private http = inject(HttpClient);

  user = input<any | null>(null); // Read-only input

  close = output<void>(); // Output event using output()

  ngOnChanges() {
    console.log('User set in modal:', this.user());
  }

  closeModal() {
    this.close.emit(); // Emit the close event
  }

  updateUser() {
    if (!this.user()) return;

    this.http
      .put(`http://localhost:3000/users/${this.user().id}`, this.user())
      .subscribe({
        next: () => {
          alert('User info updated successfully!');
          this.closeModal(); // Close modal after updating
        },
        error: (err) => console.error('Error updating user:', err),
      });
  }
}
