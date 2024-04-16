import { Injectable } from '@angular/core';
import { TotalService } from './total.service';
import { Sport } from '../model/sport.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Sport[] = [];

  constructor(private totalService: TotalService) {}

  addToCart(sport:Sport) {
    // Vérifier si le produit est déjà dans le panier
    const existingItem = this.cartItems.find((item) => item.id === sport.id);

    if (existingItem) {
      // Si le produit existe, augmenter la quantité
      existingItem.nbSeat += 1;
    } else {
      // Sinon, ajouter le produit au panier
      const newItem = { ...sport, nbSeat: 1 };
      this.cartItems.push(newItem);
    }
  }

  removeFromCart(sportId: number): void {
    // Retirer un produit du panier en fonction de son ID
    this.cartItems = this.cartItems.filter((item) => item.id !== sportId);
  }

  getCartItems(): any[] {
    // Obtenir les éléments du panier
    return this.cartItems;
  }

  clearCart(): void {
    // Vider le panier
    this.cartItems = [];
  }

  getTotalQuantity(): number {
    // Calculer et retourner le total de la quantité
    return this.cartItems.reduce((total, item) => total + (item.nbSeat || 0), 0);
  }

  getTotalPrice(): number {
    // Calculer et retourner le total du prix
    return this.cartItems.reduce((total, item) => total + (item.price * item.nbSeat || 0), 0);
  }

  updateQuantity(productId: number, newNbSeat: number): void {
    const item = this.cartItems.find((item) => item.id === productId);

    if (item) {
      item.nbSeat = newNbSeat;
    }
  }
}
