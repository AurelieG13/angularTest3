import { Injectable } from '@angular/core';
import { TotalService } from './total.service';
import { Sport } from '../model/sport.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Sport[] = [];
  //items: Array<{ name: string, nbSeat: number, price: number }> = [];

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


  /* addToCart(sport: { name: string, nbSeat: number, price: number }) {
    this.items.push(sport);
    this.updateTotal();
    this.updateTotalSeat();

  } */

  /* getItems(): Array<{ name: string, nbSeat: number, price: number }> {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  updateTotal(): void {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    this.totalService.updateTotal(total);
  }

  updateTotalSeat(): void {
    const totalSeat = this.items.reduce((sum, item) => sum + item.nbSeat, 0);
    this.totalService.updateTotalSeat(totalSeat);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  getTotalSeat(): number {
    return this.items.reduce((totalItem, item) => totalItem + item.nbSeat, 0);
  }


  removeItem(index: number) {
    this.items.splice(index, 1);
  } */
}
