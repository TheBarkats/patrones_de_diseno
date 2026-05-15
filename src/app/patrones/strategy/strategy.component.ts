import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StrategyService } from './strategy.service';

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css'],
})
export class StrategyComponent {
  cartItems: any[] = [];
  selectedProduct: string = '';
  selectedPaymentMethod: string = '';
  paymentMethods = ['Tarjeta', 'PayPal', 'Cripto'];
  checkoutResult: string = '';
  transactionHistory: string[] = [];

  private productPrices: any = {
    laptop: 800,
    mouse: 25,
    keyboard: 100,
    monitor: 300,
  };

  constructor(private service: StrategyService) {}

  addProduct(): void {
    if (!this.selectedProduct) return;
    const price = this.productPrices[this.selectedProduct];
    const name = this.selectedProduct.charAt(0).toUpperCase() + this.selectedProduct.slice(1);
    this.cartItems.push({ name, price, id: Date.now() });
    this.selectedProduct = '';
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  getPaymentMethodEmoji(method: string): string {
    const emojis: any = { 'Tarjeta': '💳', 'PayPal': '🅿️', 'Cripto': '₿' };
    return emojis[method] || '';
  }

  checkout(): void {
    if (this.cartItems.length === 0 || !this.selectedPaymentMethod) return;
    const results = this.service.demonstrateDifferentPayments();
    const found = results.find((r: any) => r.method === this.selectedPaymentMethod);
    if (found) {
      this.checkoutResult = found.result;
      this.transactionHistory.unshift(`${new Date().toLocaleTimeString()}: ${found.result}`);
      this.cartItems = [];
      this.selectedPaymentMethod = '';
    }
  }
}