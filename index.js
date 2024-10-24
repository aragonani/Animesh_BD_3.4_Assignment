const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addNewItem(cart, newItem) {
  cart.push(newItem);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let newItem = {
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };

  let result = addNewItem(cart, newItem);
  res.json({ cartItems: result });
});

function updateCartEdit(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateCartEdit(cart, productId, quantity);
  res.json({ cartItems: result });
});

function deleteItem(cart, productId) {
  if (cart.productId === productId) {
    return !cart.productId;
  }
  return cart.productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItem(cart, productId));
  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function totalQuantity(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].quantity;
  }
  return sum;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity: result });
});

function totalPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].price * cart[i].quantity;
  }
  return sum;
}

app.get('/cart/total-price', (req, res) => {
  let result = totalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
