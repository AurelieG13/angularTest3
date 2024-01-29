import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth: string ='http://localhost:8080/api/auth';
  apiURLUsers: string ='http://localhost:8080/api/users';
  token!: string;
  public isloggedIn: Boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  login(user: User) {
    return this.http.post<User>(this.apiURLAuth+'/login', user, {observe: 'response'});
  }

  logout() {
    this.token = "";
    localStorage.setItem('jwtToken', this.token);
    return this.http.post(this.apiURLAuth+'/logout', {});
  }

  register(jsonData: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiURLUsers+'/saveUser', jsonData, {headers});
  }




  //methods

  saveToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    this.token = jwtToken;
    this.isloggedIn = true;
  }


}
