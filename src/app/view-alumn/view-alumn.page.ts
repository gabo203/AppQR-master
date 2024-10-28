import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-alumn',
  templateUrl: './view-alumn.page.html',
  styleUrls: ['./view-alumn.page.scss'],
})
export class ViewAlumnPage implements OnInit {
  username: string = '';
  showPokemonList: boolean = false;
  isQRVisible: boolean = false;
  qrCodeData: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(userData => {
      if (userData) {
        this.username = userData.username;
        this.qrCodeData = JSON.stringify({
          username: userData.username,
          id: userData.uid
        });
      }
    });
  }

  togglePokemonList() {
    this.showPokemonList = !this.showPokemonList;
  }

  showQRCode() {
    this.isQRVisible = true;
  }

  hideQRCode() {
    this.isQRVisible = false;
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