/**
 * Pure cart and financial calculation logic.
 * Decoupled from React UI for deterministic testing and clean architecture.
 */

export interface CartItem {
  id: string; // Composite key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  size: string | number;
  color: string;
  quantity: number;
  maxStock: number;
}

export interface CartTotals {
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingQualified: boolean;
  total: number;
}

export function getCartItemKey(productId: string, size: string | number, color: string): string {
  return `${productId}__${String(size)}__${color.trim().toLowerCase()}`;
}

export function formatPricePKR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Rs. 0';
  }
  return `Rs. ${Math.round(amount).toLocaleString('en-US')}`;
}

export function addItemToCart(
  cart: CartItem[],
  itemToAdd: {
    productId: string;
    name: string;
    image: string;
    unitPrice: number;
    size: string | number;
    color: string;
    quantity: number;
    maxStock: number;
  }
): CartItem[] {
  const itemKey = getCartItemKey(itemToAdd.productId, itemToAdd.size, itemToAdd.color);
  const existingIndex = cart.findIndex((item) => item.id === itemKey);

  const sanitizedQuantity = Math.max(1, itemToAdd.quantity || 1);
  const maxStock = Math.max(1, itemToAdd.maxStock || 10);

  if (existingIndex > -1) {
    return cart.map((item, index) => {
      if (index === existingIndex) {
        const nextQty = Math.min(item.quantity + sanitizedQuantity, maxStock);
        return { ...item, quantity: nextQty };
      }
      return item;
    });
  }

  const initialQty = Math.min(sanitizedQuantity, maxStock);
  const newItem: CartItem = {
    ...itemToAdd,
    id: itemKey,
    quantity: initialQty,
    maxStock,
  };

  return [...cart, newItem];
}

export function updateCartQuantity(
  cart: CartItem[],
  productId: string,
  size: string | number,
  color: string,
  newQuantity: number
): CartItem[] {
  const targetKey = getCartItemKey(productId, size, color);

  if (newQuantity <= 0) {
    return cart.filter((item) => item.id !== targetKey);
  }

  return cart.map((item) => {
    if (item.id === targetKey) {
      const clamped = Math.min(Math.max(1, newQuantity), item.maxStock);
      return { ...item, quantity: clamped };
    }
    return item;
  });
}

export function removeFromCart(
  cart: CartItem[],
  productId: string,
  size: string | number,
  color: string
): CartItem[] {
  const targetKey = getCartItemKey(productId, size, color);
  return cart.filter((item) => item.id !== targetKey);
}

export function calculateCartTotals(cart: CartItem[]): CartTotals {
  const FREE_SHIPPING_THRESHOLD = 10000;
  const STANDARD_SHIPPING_FEE = 450;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingQualified = subtotal >= FREE_SHIPPING_THRESHOLD || totalItems === 0;
  const shippingFee = totalItems === 0 ? 0 : freeShippingQualified ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  return {
    totalItems,
    subtotal,
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingQualified,
    total,
  };
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Standard RFC5322-compatible email check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

export function validateContactForm(form: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  if (!form.email || !validateEmail(form.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!form.subject || form.subject.trim().length < 3) {
    errors.subject = 'Please specify a subject.';
  }

  if (!form.message || form.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
