import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  passwordFieldType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  confirmPasswordFieldType: string = 'password';
  confirmPasswordIcon: string = 'eye-off-outline';
  passwordMismatch: boolean = false;
  emailInvalid: boolean = false;
  usernameInvalid: boolean = false;
  private errorTimeout: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  register() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    this.emailInvalid = this.email !== '' && !this.isValidEmail(this.email);
    this.usernameInvalid = this.username !== '' && !this.isValidUsername(this.username);

    if (this.passwordMismatch || this.emailInvalid || this.usernameInvalid) {
      this.triggerShakeAnimation();
      this.resetErrorTimeout();
    } else {
      this.authService.register(this.email, this.password, this.username)
        .then(resultado => {
          if (resultado) {
            this.toastr.success('¡Registro exitoso! Por favor, verifica tu bandeja de entrada para confirmar tu registro.', 'Registro Exitoso');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Error en el registro. Por favor, intente nuevamente.', 'Error');
          }
        })
        .catch(error => {
          console.error('Error en el registro: ', error);
          this.toastr.error('Error en el registro. Por favor, verifique sus datos e intente nuevamente.', 'Error');
        });
    }
  }

  isValidEmail(email: string): boolean {
    return email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
  }

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  }

  triggerShakeAnimation() {
    const errorMessageElements = document.querySelectorAll('.error-message');
    errorMessageElements.forEach(element => {
      const htmlElement = element as HTMLElement;
      htmlElement.classList.remove('shake');
      void htmlElement.offsetWidth; // Trigger reflow
      htmlElement.classList.add('shake');
    });
  }

  resetErrorTimeout() {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    this.errorTimeout = setTimeout(() => {
      this.passwordMismatch = false;
      this.emailInvalid = false;
      this.usernameInvalid = false;
    }, 5000);
  }

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }

  toggleConfirmPasswordVisibility() {
    if (this.confirmPasswordFieldType === 'password') {
      this.confirmPasswordFieldType = 'text';
      this.confirmPasswordIcon = 'eye-outline';
    } else {
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordIcon = 'eye-off-outline';
    }
  }
}