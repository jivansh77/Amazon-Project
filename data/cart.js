export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
  cart = 
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
//just some data for understanding how it works, avtually it will be empty.

function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId)
{
  let matchingItem;
  //if we click add again we should not see same item twice the cart should update the quantity to 2
  cart.forEach((cartItem) => {   
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
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function addedToCart(productId, addedMessageTimeouts)
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

export function removeFromCart(productId)
{
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId!==productId)
    newCart.push(cartItem);
  });

  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity()
{
  let cartQuantity=0;
  cart.forEach((cartItem) => {
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity)
{
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId)
    matchingItem = cartItem;
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId)
{
  let matchingItem;
  cart.forEach((cartItem) => {   
    if (productId === cartItem.productId) 
    matchingItem = cartItem;
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}