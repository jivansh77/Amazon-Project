import {validDeliveryOption} from './deliveryOptions.js';

class Cart   //class to generate this object later
{
  cartItems;      //same as export let cart; from cart.js
  localStorageKey;  //basically localStorageKey = undefined;

  constructor(localStorageKey) //for setup code, it runs automatically
  {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();  //to eventually reload the cart
  }

  loadFromStorage() 
  {  
    this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));
    if(!this.cartItems)
    {
      this.cartItems = 
        [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        } , {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
    }
    //just some data for understanding how it works, actually it will be empty.
  }

  saveToStorage() 
  {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId)
  {
    let matchingItem;
    //if we click add again we should not see same item twice the cart should update the quantity to 2
    this.cartItems.forEach((cartItem) => {   
      if (productId === cartItem.productId) 
      matchingItem = cartItem;
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);//template strings
    const quantity = Number(quantitySelector.value);

    if (matchingItem)  //truthy value since its an object
    {
      matchingItem.quantity += quantity;
    }
    else
    {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  addedToCart(productId, addedMessageTimeouts)
  {
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) 
    {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[productId] = timeoutId;
  }

  removeFromCart(productId)
  {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId!==productId)
      newCart.push(cartItem);
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity()
  {
    let cartQuantity=0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity+=cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity)
  {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
      matchingItem = cartItem;
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId)
  {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {   
      if (productId === cartItem.productId) 
      matchingItem = cartItem;
    });

    if (!matchingItem) 
    {
      return;
    }
    
    if (!validDeliveryOption(deliveryOptionId))
    {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business'); 
//to create another cart businessCart

console.log(cart);
console.log(businessCart);
