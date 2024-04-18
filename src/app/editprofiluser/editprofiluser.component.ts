import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAuthDTO, UserDTO } from '../model/user-auth-dto.model';

@Component({
  selector: 'app-editprofiluser',
  templateUrl: './editprofiluser.component.html',
  styleUrl: './editprofiluser.component.css'
})
export class EditprofiluserComponent implements OnInit {

  myFormProfil!: FormGroup;
  err!:number;
  currentUser!: UserAuthDTO;
  editing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (userAuthDTO: UserAuthDTO) => {
        this.currentUser = userAuthDTO;
        console.log(this.currentUser);
      },
      error => {
        console.error('Erreur current user', error);
      }
    );
    this.myFormProfil = this.formBuilder.group({
      firstname : [''],
      lastname : [''],
      phone: ['']
    } );
  }


  toggleEditing(): void {
    this.editing = !this.editing;
  }

  saveChanges(): void {
    if (this.myFormProfil.valid) {
      this.currentUser.userDTO.firstname = this.myFormProfil.value.firstname;
      this.currentUser.userDTO.lastname = this.myFormProfil.value.lastname;
      this.currentUser.userDTO.phone = this.myFormProfil.value.phone;

      console.log('Modifications enregistrées:', this.currentUser);

      this.authService.updateUser(this.currentUser).subscribe(
        (updatedUser: UserAuthDTO) => {
          console.log('Utilisateur mis à jour avec succès:', updatedUser);
          this.editing = false;
        },
        error => {
          console.error('erreur à la mise à jour', error);
        }
      );
    } else {
      console.error('Formulaire invalide');
    }


  }
}
