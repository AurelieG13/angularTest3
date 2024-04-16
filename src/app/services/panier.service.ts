import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sport } from '../model/sport.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class PanierService{

  private apiUrl = environment.apiUrl
  private apiUrlSport = this.apiUrl+'/sports';


  private panier: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrlSport+'/all');
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(this.apiUrlSport+'/id');
  }


  addSport(sport: Sport): void {
    this.panier.push(sport);
  }

  getPanier(): any[] {
    return this.panier;
  }

  deletePanier(): void {
    this.panier = [];
  }

  deleteOneSport(index: number): void {
    this.panier.splice(index, 1);
  }

  calculerTotal(): number {
    return this.panier.reduce((total, sport) => total + sport.price, 0);
  }


  calculerTotalPlace(): number {
    return this.panier.reduce((total, sport) => total + sport.nbSeat, 0);
  }


  calculateSubtotals() {
    const subtotals: {[key: string]: number} = {};
    this.panier.forEach(item => {
      if (!subtotals[item.name]) {
        subtotals[item.name] = item.price;
      } else {
        subtotals[item.name] += item.price;
      }
    });
    return subtotals;
  }

}
