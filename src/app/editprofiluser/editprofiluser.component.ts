import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../model/user-auth-dto.model';

@Component({
  selector: 'app-editprofiluser',
  templateUrl: './editprofiluser.component.html',
  styleUrl: './editprofiluser.component.css'
})
export class EditprofiluserComponent implements OnInit {

  myFormProfil!: FormGroup;
  err!:number;
  currentUser!: UserDTO;
  editing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (user: UserDTO) => {
        this.currentUser = user;
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
      this.currentUser.firstname = this.myFormProfil.value.firstname;
      this.currentUser.lastname = this.myFormProfil.value.lastname;
      this.currentUser.phone = this.myFormProfil.value.phone;

      this.authService.updateUser(this.currentUser).subscribe(
        (updatedUser: UserDTO) => {
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
