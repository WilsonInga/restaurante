import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restaurante';
  isHeaderVisible = true;
  isFooterVisible = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscríbete a los cambios de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateVisibility(event.urlAfterRedirects);
      }
    });
  }

  updateVisibility(url: string) {
    // Define qué rutas deben ocultar el encabezado y el pie
    if (url === '/login' || url === '/register'|| url=== '/admin') {
      this.isHeaderVisible = false;
      this.isFooterVisible = true;
    } else {
      this.isHeaderVisible = true;
      this.isFooterVisible = true;
    }
  }
}
