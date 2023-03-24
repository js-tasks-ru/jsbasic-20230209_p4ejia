export default class Cart {

  constructor(cartIcon) {
    this.cartItems = []; // [product: {...}, count: N]
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product || typeof product !== 'object') {
      return;
    }
    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (!cartItem) {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);

    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count === 0) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.count;
    }, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

