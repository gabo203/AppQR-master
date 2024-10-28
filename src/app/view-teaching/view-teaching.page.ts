import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-teaching',
  templateUrl: './view-teaching.page.html',
  styleUrls: ['./view-teaching.page.scss'],
})
export class ViewTeachingPage implements OnInit {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(userData => {
      if (userData) {
        this.username = userData.username;
      }
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}