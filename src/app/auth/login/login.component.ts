import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user = new User();
  erreur: number = 0;
  err:number = 0;
  message: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
      ){}

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.message = params['message'] || null;
      })
    }

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
