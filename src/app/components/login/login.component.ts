import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  emailInvalid: boolean = false;
  emailNotRegistered: boolean = false;
  incorrectPassword: boolean = false;
  private errorTimeout: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  async login() {
    this.emailInvalid = !this.isValidEmail(this.email);
    this.emailNotRegistered = false;
    this.incorrectPassword = false;

    if (this.emailInvalid) {
      this.triggerErrorAnimation();
      return;
    }

    try {
      const resultado = await this.authService.login(this.email, this.password);
      if (resultado) {
        const isEmailVerified = await this.authService.checkEmailVerification();
        if (!isEmailVerified) {
          this.toastr.error(
            '<span class="toast-icon">⚠️</span> Por favor, verifica tu correo electrónico para continuar.',
            'Error',
            {
              enableHtml: true,
              toastClass: 'ngx-toastr custom-toastr-error',
            }
          );
          return;
        }

        this.toastr.success('¡Inicio de sesión exitoso!', 'Bienvenido');
        if (this.email.endsWith('@duocuc.cl')) {
          this.router.navigate(['/view-alumn']);
        } else if (this.email.endsWith('@profesor.duoc.cl')) {
          this.router.navigate(['/view-teaching']);
        }
      } else {
        this.emailNotRegistered = !(await this.authService.isEmailRegistered(this.email));
        this.incorrectPassword = !this.emailNotRegistered;
        this.triggerErrorAnimation();
      }
    } catch (error) {
      console.error('Error en el inicio de sesión: ', error);
      this.toastr.error('Error en el inicio de sesión. Por favor, verifique sus credenciales e intente nuevamente.', 'Error');
    }
  }

  isValidEmail(email: string): boolean {
    return email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl');
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

  triggerErrorAnimation() {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    this.errorTimeout = setTimeout(() => {
      this.emailInvalid = false;
      this.emailNotRegistered = false;
      this.incorrectPassword = false;
    }, 5000);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}