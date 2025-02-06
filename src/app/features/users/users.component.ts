import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModalComponent } from '../../shared/components/user-modal/user-modal.component';
import { UserInterface } from '../../core/interfaces/user.interface';
import { sortBy } from 'lodash';
import { Sorting } from '../../core/interfaces/sorting';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSortUp,
  faSort,
  faSortDown,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserModalComponent, FontAwesomeModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private http = inject(HttpClient);

  users = signal<UserInterface[]>([]); // Stores users
  selectedUser = signal<UserInterface | null>(null); // Tracks selected user
  sortedUsers = signal<UserInterface[]>([]); // Stores sorted users

  sortOrder: Sorting = {
    id: 'none',
    username: 'none',
    password: 'none',
    name: 'none',
    surname: 'none',
    email: 'none',
    registrationDate: 'none',
    isActive: 'none',
  };

  constructor() {
    this.http.get<UserInterface[]>('http://localhost:3000/users').subscribe({
      next: (data) => {
        this.users.set(data); // Store the original users
        this.sortedUsers.set(data); // Store the sorted users
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  // Sort user table
  sortData(sortKey: keyof Sorting): void {
    // Toggle sorting order
    const currentOrder = this.sortOrder[sortKey];
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    this.sortOrder[sortKey] = newOrder;

    const sorted = sortBy(this.users(), [sortKey]);

    if (newOrder === 'desc') {
      this.sortedUsers.set(sorted.reverse());
    } else {
      this.sortedUsers.set(sorted);
    }
  }

  sortSign(sortKey: keyof Sorting): IconDefinition {
    if (this.sortOrder[sortKey] === 'asc') {
      return faSortUp; // Up arrow
    } else {
      return faSortDown; // Down arrow
    }
  }

  openModal(user: UserInterface) {
    this.selectedUser.set(null); // Reset first to trigger change detection
    setTimeout(() => {
      this.selectedUser.set(user);
    }, 0);
  }

  closeModal() {
    // Close modal and clear selected user
    this.selectedUser.set(null);
  }
}
