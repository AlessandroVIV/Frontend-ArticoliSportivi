import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false;
  isAdmin = false;
  private user: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log("AuthService constructor");

    if (isPlatformBrowser(this.platformId)) {
      const isLoggedValue = localStorage.getItem("isLogged");
      const isAdminValue = localStorage.getItem("isAdmin");
      const storedUser = localStorage.getItem("utente");

      if (isLoggedValue != null && isAdminValue != null) {
        this.isLogged = isLoggedValue === '1';
        this.isAdmin = isAdminValue === '1';
      } else {
        localStorage.setItem("isLogged", "0");
        localStorage.setItem("isAdmin", "0");
      }

      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
  }

  setUser(user: any) {
    this.user = user;
    localStorage.setItem("utente", JSON.stringify(user));
  }

  getUser() {
    if (this.user) return this.user;
    const stored = localStorage.getItem("utente");
    return stored ? JSON.parse(stored) : null;
  }

  getUserId(): number | null {
    return this.getUser()?.id ?? null;
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem("utente");
  }

  isAutentificated() {
    return this.isLogged;
  }

  isRoleAdmin() {
    return this.isAdmin;
  }

  setAuthentificated() {
    localStorage.setItem("isLogged", "1");
    localStorage.setItem("isAdmin", "0");
    this.isLogged = true;
    this.isAdmin = false;
  }

  setAdmin() {
    localStorage.setItem("isAdmin", "1");
    this.isAdmin = true;
  }

  resetAll() {
    console.log("Logout effettuato");
    localStorage.setItem("isLogged", "0");
    localStorage.setItem("isAdmin", "0");
    this.isLogged = false;
    this.isAdmin = false;
    this.clearUser();
  }
  
}
