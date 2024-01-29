import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = new User();
  erreur: number = 0;
  err:number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
      ){}

  onLoggedin(){
    this.authService.login(this.user).subscribe({
      next: (response) => {
        const jwtToken = response.body?.token!;
        this.authService.saveToken(jwtToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }

}
