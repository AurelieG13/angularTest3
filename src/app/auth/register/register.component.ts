import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  myForm!: FormGroup;
  err!:number;
  formData = {
    "userDTO": {
      "firstname":'',
      "lastname":'',
      "email":''
    },
    "authDTO": {
      "pseudo":'',
      "password":'',
      "authority":''
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      pseudo : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]],
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]]
    } );
  }

  sendDataToApi() {
    const jsonData = {
      "userDTO": {
        "firstname":this.formData.userDTO.firstname,
        "lastname":this.formData.userDTO.lastname,
        "email":this.formData.authDTO.pseudo
      },
      "authDTO": {
        "pseudo": this.formData.authDTO.pseudo,
        "password":this.formData.authDTO.password,
        "authority":"ROLE_USER"
      }
    };

    this.authService.register(jsonData).subscribe(
      response => {
        console.log(response);

        this.router.navigate(['/login']);

      },
      error => {
        console.error("erreur sur appel api", error);

      }
    );
  }

}
