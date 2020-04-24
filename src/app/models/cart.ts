import {CartItem} from './cartItem';


export class Cart {
  public cart: Array<CartItem>;

  constructor(cart: Array<CartItem>) {
    this.cart = cart;
  }
}

