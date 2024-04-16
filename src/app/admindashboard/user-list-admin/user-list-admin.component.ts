import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../model/user-auth-dto.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-list-admin',
  templateUrl: './user-list-admin.component.html',
  styleUrl: './user-list-admin.component.css'
})
export class UserListAdminComponent implements OnInit{
  users: UserDTO[] = [];

  constructor(private authService: AuthService) {}
  editingUserIndex: number = -1;

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

  updateUser(user: UserDTO): void {
    console.log('Mise à jour de l\'utilisateur :', user);
    this.authService.updateUserAdmin(user).subscribe(
      (updatedUser: UserDTO) => {
        console.log('Utilisateur mis à jour :', updatedUser);
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    )
  }

  toggleEditing(index: number): void {
    this.editingUserIndex = index === this.editingUserIndex ? -1 : index;
  }

  isEditing(index: number): boolean {
    return index === this.editingUserIndex;
  }

  updateUserAdmin(user: UserDTO): void {
    // Mettre à jour l'utilisateur dans la base de données
    this.authService.updateUserAdmin(user).subscribe(
      updatedUser => {

        // Mettre à jour l'utilisateur dans la liste des utilisateurs
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        // Désactiver le mode d'édition
        this.editingUserIndex = -1;

      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    );
  }

}
