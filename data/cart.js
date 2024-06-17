export const cart = [];

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
      quantity: quantity
    });
  }
};

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
};
