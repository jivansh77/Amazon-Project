import {renderCheckoutHeader} from "./Checkout/checkoutHeader.js";
import {renderOrderSummary} from "./Checkout/orderSummary.js";
import {renderPaymentSummary} from "./Checkout/paymentSummary.js";
import {loadProducts} from "../data/products.js";
import {loadCart} from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practise.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  }),
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