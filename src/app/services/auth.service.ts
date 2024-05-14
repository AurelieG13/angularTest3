import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { UserDTO } from '../model/user-auth-dto.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl
  apiURLAuth: string = this.apiUrl+'/auth';
  apiURLUsers: string = this.apiUrl+'/users';

  token!: string;
  public roles!: string[];
  public isloggedIn: Boolean = false;
  public loggedUser!: string;
  userRole: string[] = [];
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

  getCurrentUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.apiURLUsers+'/currentUser');
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiURLUsers+'/all');
  }

    // Méthode pour mettre à jour un utilisateur
  updateUserAdmin(user: UserDTO): Observable<UserDTO> {
    const url = `${this.apiURLUsers}/admin/${user.id}`;
    return this.http.put<UserDTO>(url, user);
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(user: UserDTO): Observable<UserDTO> {
    const url = `${this.apiURLUsers}/currentUser/${user.id}`;
    return this.http.put<UserDTO>(url, user);
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
      const roles = decodeToken.roles || [];
      const isAdmin = roles.includes('ROLE_ADMIN');
      return of(isAdmin);
    }
    return throwError('Token absent ou invalide');
  }


    getToken(): Observable<string | null> {
      return this.isLoggedIn.pipe(
          map(isLoggedIn => {
              if (isLoggedIn) {
                  return this.token;
              } else {
                  return null;
              }
          })
      );
  }

  private setUserRoles() {
    if (this.token) {
      const decodeToken = this.jwtHelper.decodeToken(this.token);
      this.userRole = decodeToken.roles || [];
    } else {
      this.userRole = [];
    }
  }

  getUserRoles(): string[] {
    this.setUserRoles();
    return this.userRole;
  }


}
