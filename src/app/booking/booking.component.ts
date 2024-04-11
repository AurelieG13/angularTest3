import { Component } from '@angular/core';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';
import { PanierComponent } from '../panier/panier.component';
import { PanierService } from '../services/panier.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  sports: Sport[] = [];
  paniers: any[] = [];

  constructor(private panierService: PanierService, private sportService: SportService) {}

  ngOnInit() {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
    this.calculateSubtotals();
  }

/*   addToPanier(sportId: number): void {
    // Appeler la méthode pour ajouter le produit au panier
    const panierId = this.panierService.getPanierId();
    this.panierService.addSportToPanier(panierId, sportId);
  } */


  addSport(sport: Sport): void {
    this.panierService.addSport(sport);
    this.paniers = this.getPanier();

  }

  addSolo(sport: Sport): void {
    this.panierService.addSport(sport);
    this.paniers = this.getPanier();
  }

  addDuo(sport: Sport): void {
    this.panierService.addSport(sport);
    this.panierService.addSport(sport);
    this.paniers = this.getPanier();
  }

  addFamily(sport: Sport): void {
    this.panierService.addSport(sport);
    this.panierService.addSport(sport);
    this.panierService.addSport(sport);
    this.panierService.addSport(sport);
    this.paniers = this.getPanier();
  }

  getPanier(): any[] {
    return this.panierService.getPanier();
  }

  deletePanier(): void {
    this.panierService.deletePanier();
  }

  deleteOneSport(index: number): void {
    this.panierService.deleteOneSport(index);
  }

  getTotal(): number {
    return this.panierService.calculerTotal();
  }


  getTotalPlace(): number {
    return this.panierService.calculerTotalPlace();
  }

  //test detail panier
  subtotalArray: { id: number, subtotal: number }[] = [];

/*   calculateSubtotals() {
    const subtotalMap = this.panierService.getSubtotalMap();
    this.subtotalArray = Array.from(subtotalMap, ([id, subtotal]) => ({ id, subtotal }));
    console.log(subtotalMap);
    console.log(this.subtotalArray);
  } */

  calculateSubtotals() {
    return this.panierService.calculateSubtotals();
  }

}
