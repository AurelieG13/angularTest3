import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../model/sport.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  private apiUrl = environment.apiUrl
  private apiUrlSport = this.apiUrl+'/sports';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrlSport+'/all');
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(this.apiUrlSport+'/'+ id);
  }

  createSport(sport: Sport) {
    return this.http.post<Sport>(this.apiUrlSport+'/create', sport);
  }

  deleteOneSport(id: number): Observable<Sport> {
    return this.http.delete<Sport>(`${this.apiUrlSport}/${id}`);
  }

  // Méthode pour mettre à jour un utilisateur
  updateSportAdmin(sport: Sport): Observable<Sport> {
    const url = `${this.apiUrlSport}/${sport.id}`;
    return this.http.put<Sport>(url, sport);
  }



}
