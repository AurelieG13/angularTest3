import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../model/user-auth-dto.model';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent implements OnInit {

  currentUser!: UserDTO;

  constructor(private el: ElementRef, private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
            (user: UserDTO) => {
              this.currentUser = user;
              console.log(this.currentUser);
            },
            error => {
              console.error('Erreur current user', error);
            }
          );

    let alldrpdwn = document.querySelectorAll('.dropdown-container');

    alldrpdwn.forEach( (item:any) => {
      const a = item.parentElement.querySelector('a:first-child');
      a.addEventListener('click',(e:any) => {
        e.preventDefault();
        this.el.nativeElement.classList.toggle('active');
        item.classList.toggle('show');
      });
    });


  }


  //responsive menu
  responsiveMenu:any;
  //responsiveMainContent
  responsiveContent:any;
  defaultStatus=true;

  openNav(status:any) {
    if(status === this.defaultStatus) {
      this.responsiveMenu = {
            'display': 'block'
          }
      this.responsiveContent = {
        'margin-left':'200px'
      }
      this.defaultStatus = false;
    }else {
      this.responsiveMenu = {
        'display': null
      }
      this.responsiveContent = {
        'margin-left':null
      }
      this.defaultStatus = true;
    }

  }
}
