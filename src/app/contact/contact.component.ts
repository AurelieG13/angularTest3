import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  emailRequest: any = {};

  messageDisplayed: boolean = false;

  constructor(private emailService: EmailService) { }

  sendEmail() {
      this.messageDisplayed = true;

  }

}
