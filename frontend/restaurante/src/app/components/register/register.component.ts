import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'user';  // Valor predeterminado
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = {
      username: this.username,
      password: this.password,
      role: this.role  // Incluye el rol aquí
    };

    this.authService.register(user).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.successMessage = 'Registro exitoso, por favor inicie sesión.';
        this.errorMessage = '';  // Limpiar mensaje de error

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);  // 2 segundos de retraso
      },
      error => {
        console.error('Error en el registro', error);
        this.errorMessage = 'Error en el registro. Por favor, intente de nuevo.';  // Mostrar mensaje de error
        this.successMessage = '';  // Limpiar mensaje de éxito
      }
    );
  }
}
