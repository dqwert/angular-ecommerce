import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  // }
  //
  // listCartDetails() {

    // get a pointer to the cart items
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
        data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
    );

    // make cartService to emit values
    this.cartService.computeCartTotal();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }
}
