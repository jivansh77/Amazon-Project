import {renderCheckoutHeader} from "./Checkout/checkoutHeader.js";
import {renderOrderSummary} from "./Checkout/orderSummary.js";
import {renderPaymentSummary} from "./Checkout/paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practise.js';

async function loadPage()
{
  try {
    //throw 'error1';
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch(error) {  //For handling errors
    console.log('Unexpected error. Please try again later.');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    }); //need to call another promise to wait for cart to load
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  }); //first backend should receive request then run the code
});
*/