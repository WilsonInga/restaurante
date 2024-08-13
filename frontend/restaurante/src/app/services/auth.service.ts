import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          // Decodificar el payload del token para extraer el rol
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          
          // Asegúrate de que 'user' esté en el payload
          localStorage.setItem('role', payload.user.role);  // Extraer el rol correctamente
          
          // Redirigir según el rol
          if (payload.user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (payload.user.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          }
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
