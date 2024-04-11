import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth: string ='http://localhost:8080/api/auth';
  apiURLUsers: string ='http://localhost:8080/api/users';

  token!: string;
  public roles!: string[];
  public isloggedIn: Boolean = false;
  public loggedUser!: string;
  userRole!: string;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(user: User) {
    return this.http.post<User>(this.apiURLAuth+'/login', user, {observe: 'response'});
  }

  logout() {
    this.token = "";
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);
  }

  register(jsonData: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiURLUsers+'/saveUser', jsonData, {headers});
  }

  getUserRole(): Observable<string> {
    return this.http.get<string>(this.apiURLUsers+'/role');
  }



  //methods

  saveToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    this.token = jwtToken;
    this.isLoggedInSubject.next(true);
  }


  isAdmin(): Observable<any> {
    if (this.token) {
      const decodeToken = this.jwtHelper.decodeToken(this.token);
      this.userRole = decodeToken.roles;
      console.log("service:", this.userRole);
      return of(this.userRole);
    }
    return throwError('Token absent ou invalide');
  }

  getToken():string {
    return this.token;
  }


}
