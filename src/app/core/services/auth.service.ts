import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSig = signal<string | null>(null);

  setToken(token: string) {
    this.tokenSig.set(token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.tokenSig() || localStorage.getItem('token');
  }
}
