import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

/*   private apiUrlContact = 'http://localhost:8080/api/contact/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: any): Observable<string> {
    return this.http.post<string>(this.apiUrlContact, emailRequest);
  } */
}
