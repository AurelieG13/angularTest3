import { Component } from '@angular/core';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';
import { PanierComponent } from '../panier/panier.component';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  sports: Sport[] = [];

  constructor(private panierService: PanierService, private sportService: SportService) {}

  ngOnInit() {
    this.sportService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }

/*   addToPanier(sportId: number): void {
    // Appeler la méthode pour ajouter le produit au panier
    const panierId = this.panierService.getPanierId();
    this.panierService.addSportToPanier(panierId, sportId);
  } */


  addSport(sport: Sport): void {
    this.panierService.addSport(sport);
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

}
