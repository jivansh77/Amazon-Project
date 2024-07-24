export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order)
{
  orders.unshift(order); //moves order to beginning of array
  saveToStorage();
}

function saveToStorage()
{
  localStorage.setItem('orders', JSON.stringify(orders));
}