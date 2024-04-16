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
