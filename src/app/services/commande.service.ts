import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = environment.apiUrl
  private apiUrlCommande = this.apiUrl+'/commande';

  constructor(private http: HttpClient) { }

  getCommande(): Observable<any> {
    return this.http.get(this.apiUrlCommande+'/all')
  }

  envoyerCommande(commande: any): Observable<any>{
    return this.http.post<any>(this.apiUrlCommande+'/create', commande);
  }

  deleteOneCommande(id: number): Observable<Commande> {
    return this.http.delete<Commande>(`${this.apiUrlCommande}/${id}`);
  }
}
