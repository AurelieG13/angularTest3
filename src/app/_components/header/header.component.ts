import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userRole: string = '';
  token!: string | null;
  role!: string;
  err:number = 0;
  isLoggedIn!: boolean;

  constructor(public authService: AuthService, private jwtHelper: JwtHelperService, private router: Router){}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.authService.isAdmin().subscribe(
          (role: string) => {
            this.userRole = role;
            this.isLoggedIn = loggedIn;
            console.log("comp:", this.userRole);
          },
          (error: any) => {
            console.error("erreur lors de la récupération du role", error);
          }
        );
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
