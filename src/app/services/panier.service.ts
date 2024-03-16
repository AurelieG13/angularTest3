import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sport } from '../model/sport.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PanierService{

/*   private apiURLPanier = 'http://localhost:8080/api/panier';
  private panierIdSubject = new BehaviorSubject<number>(0);
  panierId$ = this.panierIdSubject.asObservable();


  constructor(
    private http: HttpClient
  ) {}

  createPanier(): Observable<any> {
    return this.http.post(this.apiURLPanier+'/create', {});
  }

  setPanierId(panierId: number): void {
    this.panierIdSubject.next(panierId);
  }

  getPanierId(): number {
    return this.panierIdSubject.value;
  }

  addSportToPanier(panierId: number, sportId: number): Observable<any> {
    return this.http.post(`${this.apiURLPanier}/${panierId}/add-sport/${sportId}`, {});
  }

  checkoutPanier(panierId: number): Observable<any> {
    return this.http.post(`${this.apiURLPanier}/${panierId}/checkout`, {});
  } */

  private apiUrlSport = 'http://localhost:8080/api/sports';


  private panier: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiUrlSport+'/all');
  }

  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(this.apiUrlSport+'/id');
  }


  addSport(sport: Sport): void {
    //console.log("ajout ok");
    /* if (this.panier.length <= 0) {
      this.panier.push(sport);
    } */
    this.panier.push(sport);
    //console.log(this.getPanier());

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

  // test détail panier par id
/*   getSubtotalMap(): Map<number, number> {
    const subtotalMap = new Map<number, number>();

    this.panier.forEach(item => {
      if (subtotalMap.has(item.id)) {
        subtotalMap.set(item.id, subtotalMap.get(item.id)! + item.price);
      } else {
        subtotalMap.set(item.id, item.price);
      }
    });

    return subtotalMap;
  } */

  calculateSubtotals() {
    const subtotals: {[key: number]: number} = {};
    this.panier.forEach(item => {
      if (!subtotals[item.id]) {
        subtotals[item.id] = item.price;
      } else {
        subtotals[item.id] += item.price;
      }
    });
    return subtotals;
  }

}
