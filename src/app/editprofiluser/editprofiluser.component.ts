import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editprofiluser',
  templateUrl: './editprofiluser.component.html',
  styleUrl: './editprofiluser.component.css'
})
export class EditprofiluserComponent implements OnInit {

  myFormProfil!: FormGroup;
  err!:number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.myFormProfil = this.formBuilder.group({
      pseudo : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]],
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]]
    } );
  }
}
