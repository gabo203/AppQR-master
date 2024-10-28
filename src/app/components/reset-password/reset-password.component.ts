import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { QuerySnapshot } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router, private firestore: AngularFirestore) {}

  async resetPassword() {
    if (!this.email.endsWith('@duocuc.cl') && !this.email.endsWith('@profesor.duoc.cl')) {
      alert('Solo se permite el restablecimiento de contraseña para correos que terminan en @duocuc.cl o @profesor.duoc.cl.');
      return;
    }

    try {
      const emailExists = await this.checkEmailExists(this.email);
      if (!emailExists) {
        alert('El correo electrónico no está registrado. Por favor, verifica tu correo e intenta nuevamente.');
        return;
      }

      await this.authService.sendPasswordResetEmail(this.email);
      alert('Se ha enviado un correo de restablecimiento de contraseña. Por favor, revisa tu bandeja de entrada.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento: ', error);
      alert('Error al enviar el correo de restablecimiento. Por favor, verifica tu correo electrónico e intenta nuevamente.');
    }
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    try {
      const userSnapshot: QuerySnapshot<any> = await firstValueFrom(
        this.firestore.collection('users', ref => ref.where('email', '==', email)).get()
      );
      return !userSnapshot.empty;
    } catch (error) {
      console.error('Error al verificar la existencia del correo electrónico: ', error);
      return false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}