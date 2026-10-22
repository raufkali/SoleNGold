import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addItemToCart,
  updateCartQuantity,
  removeFromCart,
  calculateCartTotals,
  formatPricePKR,
  validateEmail,
  validateContactForm,
  getCartItemKey,
} from './cartLogic';

test('formatPricePKR formats numbers correctly', () => {
  assert.equal(formatPricePKR(4500), 'Rs. 4,500');
  assert.equal(formatPricePKR(12900), 'Rs. 12,900');
  assert.equal(formatPricePKR(0), 'Rs. 0');
});

test('getCartItemKey generates consistent normalized keys', () => {
  const key1 = getCartItemKey('aurelio-classic-sneakers', 42, 'Ivory White');
  const key2 = getCartItemKey('aurelio-classic-sneakers', 42, '  ivory white ');
  assert.equal(key1, key2);
});

test('addItemToCart adds new item and stacks quantity for identical variant', () => {
  const initialCart: any[] = [];
  const item1 = {
    productId: 'aurelio-sneakers',
    name: 'Aurelio Classic Sneakers',
    image: '/test.jpg',
    unitPrice: 6900,
    size: 42,
    color: 'Ivory White',
    quantity: 1,
    maxStock: 5,
  };

  const cartWithOne = addItemToCart(initialCart, item1);
  assert.equal(cartWithOne.length, 1);
  assert.equal(cartWithOne[0].quantity, 1);

  // Add same item again -> increments quantity
  const cartWithTwo = addItemToCart(cartWithOne, item1);
  assert.equal(cartWithTwo.length, 1);
  assert.equal(cartWithTwo[0].quantity, 2);

  // Add different size -> separate line item
  const itemDifferentSize = { ...item1, size: 43 };
  const cartWithTwoLines = addItemToCart(cartWithTwo, itemDifferentSize);
  assert.equal(cartWithTwoLines.length, 2);
  assert.equal(cartWithTwoLines[0].quantity, 2);
  assert.equal(cartWithTwoLines[1].quantity, 1);
});

test('addItemToCart respects max stock ceiling', () => {
  const item = {
    productId: 'limited-loafer',
    name: 'Verona Leather Loafers',
    image: '/test.jpg',
    unitPrice: 8500,
    size: 41,
    color: 'Cognac',
    quantity: 4,
    maxStock: 5,
  };

  let cart = addItemToCart([], item);
  assert.equal(cart[0].quantity, 4);

  // Attempting to add 3 more when max is 5 clamps to 5
  cart = addItemToCart(cart, { ...item, quantity: 3 });
  assert.equal(cart[0].quantity, 5);
});

test('updateCartQuantity and removeFromCart behave properly', () => {
  const item = {
    productId: 'chelsea-boots',
    name: 'Milano Chelsea Boots',
    image: '/test.jpg',
    unitPrice: 9500,
    size: 42,
    color: 'Onyx Black',
    quantity: 2,
    maxStock: 8,
  };

  let cart = addItemToCart([], item);
  cart = updateCartQuantity(cart, 'chelsea-boots', 42, 'Onyx Black', 4);
  assert.equal(cart[0].quantity, 4);

  // Update to 0 removes item
  cart = updateCartQuantity(cart, 'chelsea-boots', 42, 'Onyx Black', 0);
  assert.equal(cart.length, 0);

  // Direct remove
  cart = addItemToCart([], item);
  cart = removeFromCart(cart, 'chelsea-boots', 42, 'Onyx Black');
  assert.equal(cart.length, 0);
});

test('calculateCartTotals computes subtotal and applies free shipping over threshold', () => {
  const item1 = {
    id: '1',
    productId: 'p1',
    name: 'Item 1',
    image: '',
    unitPrice: 4000,
    size: 41,
    color: 'Black',
    quantity: 1,
    maxStock: 10,
  };

  // Subtotal = 4000 (< 10000 threshold), so shipping fee = 450
  const totals1 = calculateCartTotals([item1]);
  assert.equal(totals1.subtotal, 4000);
  assert.equal(totals1.shippingFee, 450);
  assert.equal(totals1.total, 4450);
  assert.equal(totals1.freeShippingQualified, false);

  // With 3 items = 12000 (>= 10000 threshold), free shipping
  const totals2 = calculateCartTotals([{ ...item1, quantity: 3 }]);
  assert.equal(totals2.subtotal, 12000);
  assert.equal(totals2.shippingFee, 0);
  assert.equal(totals2.total, 12000);
  assert.equal(totals2.freeShippingQualified, true);

  // Empty cart
  const totalsEmpty = calculateCartTotals([]);
  assert.equal(totalsEmpty.total, 0);
  assert.equal(totalsEmpty.totalItems, 0);
});

test('validateEmail and validateContactForm work accurately', () => {
  assert.equal(validateEmail('test@luxury.com'), true);
  assert.equal(validateEmail('not-an-email'), false);
  assert.equal(validateEmail(''), false);

  const validForm = {
    name: 'Hamza Khan',
    email: 'hamza@example.com',
    subject: 'Sizing inquiry for Verona Loafers',
    message: 'Hello, I would like to check sizing recommendations for wide feet.',
  };
  const resValid = validateContactForm(validForm);
  assert.equal(resValid.isValid, true);
  assert.equal(Object.keys(resValid.errors).length, 0);

  const invalidForm = {
    name: '',
    email: 'bad-email',
    subject: '',
    message: 'short',
  };
  const resInvalid = validateContactForm(invalidForm);
  assert.equal(resInvalid.isValid, false);
  assert.ok(resInvalid.errors.name);
  assert.ok(resInvalid.errors.email);
  assert.ok(resInvalid.errors.subject);
  assert.ok(resInvalid.errors.message);
});
