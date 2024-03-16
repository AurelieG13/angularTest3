import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../model/sport.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private apiUrlSport = 'http://localhost:8080/api/sports';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrlSport+'/all');
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(this.apiUrlSport+'/id');
  }
}
