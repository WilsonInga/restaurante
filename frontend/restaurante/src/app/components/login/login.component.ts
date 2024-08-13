import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  successMessage = '';
  errorMessage = '';  // Variable para el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        console.log('Login exitoso', response);
        this.successMessage = 'Inicio de sesión exitoso';  // Mostrar mensaje de éxito
        this.errorMessage = '';  // Limpiar mensaje de error

        const role = this.authService.getUserRole();

        // Redirigir al dashboard correspondiente después de 1 segundo
        setTimeout(() => {
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'user') {
            this.router.navigate(['/user']);
          }
        }, 1000);  // 1 segundo de retraso para mostrar el mensaje
      },
      (error) => {
        console.error('Error en el login', error);
        this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu nombre de usuario y contraseña.';  // Mostrar mensaje de error
        this.successMessage = '';  // Limpiar mensaje de éxito
      }
    );
  }
}

