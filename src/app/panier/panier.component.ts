import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Sport } from '../model/sport.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit{
  panierId!: number;

/*   constructor(private panierService: PanierService) {}
 */
/*   ngOnInit(): void {
    // Au chargement du composant, créez un nouveau panier
    this.panierService.panierId$.subscribe((panierId) => {
      this.panierId = panierId;
    })
  } */


/*   addSportToPanier(sportId: number): void {
    // Ajouter un produit au panier
    this.panierService.addSportToPanier(this.panierId, sportId).subscribe((response) => {
      console.log(response);
      // Actualisez le contenu du panier ou effectuez d'autres actions nécessaires
    });
  } */

/*   checkoutPanier(): void {
    // Finaliser l'achat
    this.panierService.checkoutPanier(this.panierId).subscribe((response) => {
      console.log(response);
      // Effectuez des actions après la finalisation de l'achat
    });
  } */

  sports: Sport[] = [];
  panier: any[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.panierService.getSports().subscribe((data) => {
      this.sports = data;
    });
  }


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
