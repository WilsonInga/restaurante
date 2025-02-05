import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private apiUrl = 'http://localhost:5000/api/restaurants';

    constructor(private http: HttpClient) {}

    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.apiUrl);
    }

    createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
        return this.http.post<Restaurant>(this.apiUrl, restaurant);
    }

    updateRestaurant(id: string, restaurant: Restaurant): Observable<Restaurant> {
        return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, restaurant);
    }

    deleteRestaurant(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
