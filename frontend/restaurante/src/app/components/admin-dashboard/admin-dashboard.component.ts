// src/app/components/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  restaurant: Restaurant = {
    name: '',
    address: '',
    description: '',
    owner: ''
  };

  constructor(private restaurantService: RestaurantService) {}

  addRestaurant() {
    this.restaurantService.createRestaurant(this.restaurant).subscribe(
      (response) => {
        console.log('Restaurante agregado exitosamente', response);
        // Limpiar el formulario o manejar el éxito aquí
      },
      (error) => {
        console.error('Error al agregar restaurante', error);
        // Manejar el error aquí
      }
    );
  }
}
