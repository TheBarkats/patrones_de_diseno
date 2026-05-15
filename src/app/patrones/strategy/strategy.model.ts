/**
 * ════════════════════════════════════════════════════════════════
 * PATRÓN: STRATEGY
 * ════════════════════════════════════════════════════════════════
 * ¿QUÉ PROBLEMA RESUELVE?
 * Encapsular diferentes algoritmos que pueden intercambiarse en tiempo de ejecución.
 * 
 * ¿POR QUÉ ES ADECUADO?
 * - Evita largos condicionales (if-else)
 * - Permite cambiar comportamiento dinámicamente
 * - Cada algoritmo en su propia clase
 * 
 * ¿QUÉ HACE?
 * Define una familia de algoritmos, encapsula cada uno y los hace intercambiables
 * ════════════════════════════════════════════════════════════════
 */

export interface PaymentStrategy {
  pay(amount: number): string;
  getName(): string;
}

export class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  pay(amount: number): string {
    return `💳 Pagado $${amount} con tarjeta ${this.cardNumber.slice(-4)}`;
  }

  getName(): string {
    return 'Tarjeta de Crédito';
  }
}

export class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): string {
    return `🅿️  Pagado $${amount} via PayPal (${this.email})`;
  }

  getName(): string {
    return 'PayPal';
  }
}

export class CryptoPayment implements PaymentStrategy {
  constructor(private wallet: string) {}

  pay(amount: number): string {
    return `₿ Pagado $${amount} en cripto (${this.wallet.slice(-6)})`;
  }

  getName(): string {
    return 'Criptomoneda';
  }
}

export class BankTransferPayment implements PaymentStrategy {
  constructor(private accountNumber: string) {}

  pay(amount: number): string {
    return `🏦 Transferencia de $${amount} a cuenta ${this.accountNumber.slice(-4)}`;
  }

  getName(): string {
    return 'Transferencia Bancaria';
  }
}

export class ShoppingCart {
  private items: number[] = [];
  private paymentStrategy: PaymentStrategy | null = null;

  addItem(price: number): void {
    this.items.push(price);
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  checkout(): string {
    if (!this.paymentStrategy) return '❌ Selecciona método de pago';
    const total = this.items.reduce((a, b) => a + b, 0);
    return this.paymentStrategy.pay(total);
  }

  getTotal(): number {
    return this.items.reduce((a, b) => a + b, 0);
  }

  getItems(): number[] {
    return [...this.items];
  }
}