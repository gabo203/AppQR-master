import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para registrar un nuevo usuario
  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user?.sendEmailVerification(); // Enviar correo de verificación
      await this.saveUserData(userCredential.user, username);
      return userCredential.user;
    } catch (error) {
      console.error("Error al registrar el usuario: ", error);
      throw error;
    }
  }

  // Guardar datos del usuario en Firestore
  private async saveUserData(user: any, username: string) {
    try {
      await this.firestore.collection('users').doc(user.uid).set({
        email: user.email,
        username: username
      });
      console.log("Usuario guardado en Firestore.");
    } catch (error) {
      console.error("Error al guardar el usuario en Firestore: ", error);
    }
  }

  // Verificar si el correo electrónico del usuario está verificado
  async checkEmailVerification() {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.reload(); // Recargar el estado del usuario
      return user.emailVerified;
    }
    return false;
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(email, password);
      return resultado.user;
    } catch (error) {
      console.error("Error de inicio de sesión: ", error);
      return null;
    }
  }

  // Comprobar si un correo electrónico ya está registrado
  
  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const querySnapshot = await this.firestore
        .collection('users', ref => ref.where('email', '==', email))
        .get()
        .toPromise();

      if (querySnapshot && 'empty' in querySnapshot) {
        return !querySnapshot.empty;
      } else {
        console.error("El resultado de la consulta no es un QuerySnapshot válido.");
        return false;
      }
    } catch (error) {
      console.error("Error checking if email is registered: ", error);
      return false;
    }
  }


  // Obtener datos del usuario actual
  getUserData(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Enviar correo de restablecimiento de contraseña
  async sendPasswordResetEmail(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.error("Error al enviar el correo de restablecimiento: ", error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    return this.afAuth.signOut();
  }

  // Obtener el usuario actual
  getUser() {
    return this.afAuth.user;
  }
}