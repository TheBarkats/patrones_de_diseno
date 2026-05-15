import { Injectable } from '@angular/core';
import {
  BankTransferPayment,
  CreditCardPayment,
  CryptoPayment,
  PayPalPayment,
  ShoppingCart,
} from './strategy.model';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  demonstrateDifferentPayments(): any[] {
    const results: any[] = [];

    // Carrito 1: Pago con tarjeta
    let cart = new ShoppingCart();
    cart.addItem(50);
    cart.addItem(30);
    cart.setPaymentStrategy(new CreditCardPayment('4532-1111-2222-3333'));
    results.push({
      method: 'Tarjeta',
      total: cart.getTotal(),
      result: cart.checkout(),
    });

    // Carrito 2: Pago con PayPal
    cart = new ShoppingCart();
    cart.addItem(100);
    cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
    results.push({
      method: 'PayPal',
      total: cart.getTotal(),
      result: cart.checkout(),
    });

    // Carrito 3: Pago con cripto
    cart = new ShoppingCart();
    cart.addItem(75);
    cart.setPaymentStrategy(new CryptoPayment('1A1z7agoat7fHmyvvvvv'));
    results.push({
      method: 'Cripto',
      total: cart.getTotal(),
      result: cart.checkout(),
    });

    // Carrito 4: Transferencia
    cart = new ShoppingCart();
    cart.addItem(200);
    cart.setPaymentStrategy(new BankTransferPayment('1234567890'));
    results.push({
      method: 'Transferencia',
      total: cart.getTotal(),
      result: cart.checkout(),
    });

    return results;
  }
}