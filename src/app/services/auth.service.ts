import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { UserAuthDTO, UserDTO } from '../model/user-auth-dto.model';



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

  getCurrentUser(): Observable<UserAuthDTO> {
    return this.http.get<UserAuthDTO>(this.apiURLUsers+'/currentUser');
  }

  getUsers(): Observable<UserAuthDTO[]> {
    return this.http.get<UserAuthDTO[]>(this.apiURLUsers+'/all');
  }

    // Méthode pour mettre à jour un utilisateur
  updateUserAdmin(user: UserAuthDTO): Observable<UserAuthDTO> {
    const url = `${this.apiURLUsers}/admin/${user.userDTO.id}`;
    return this.http.put<UserAuthDTO>(url, user);
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(user: UserAuthDTO): Observable<UserAuthDTO> {
    const url = `${this.apiURLUsers}/currentUser/${user.userDTO.id}`;
    return this.http.put<UserAuthDTO>(url, user);
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

/*   getToken():string | null{
    if (this.isLoggedIn) {
      console.log("token stocké");
      return this.token;
    } */

    getToken(): Observable<string | null> {
      // Vérifiez si l'utilisateur est connecté en vérifiant l'état d'authentification dans votre service AuthService
      return this.isLoggedIn.pipe(
          map(isLoggedIn => {
              if (isLoggedIn) {
                  // Si l'utilisateur est connecté, retournez le token JWT
                  return this.token;
              } else {
                  // Si l'utilisateur n'est pas connecté, retournez null ou une chaîne vide selon votre préférence
                  return null; // ou return '';
              }
          })
      );

  }


}
