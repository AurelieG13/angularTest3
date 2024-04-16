import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../model/user-auth-dto.model';

@Component({
  selector: 'app-user-list-admin',
  templateUrl: './user-list-admin.component.html',
  styleUrl: './user-list-admin.component.css'
})
export class UserListAdminComponent implements OnInit{
  users: UserDTO[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (users: UserDTO[]) => {
        this.users = users;
        console.log(this.users);
      },
      error => {
        console.error('Erreur current user', error);
      }
    );
  }
}
