const cartUtils = {}

cartUtils.removeItemFromCart = (cart, item) => {
    let newCart = [];
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id !== item.id) {
        newCart.push(item);
      }
    }
    return newCart;
}

cartUtils.addItem = function(cart, product){
  let newCart = cart.map(item => item);
  if (cart.length === 0) newCart.push(product)
  else {
    for (let i = 0; i < cart.length; i++){
      if (cart[i].id === product.id) {
        let newItem = cart[i];
        newItem.quantity += product.quantity
        newCart[i] = newItem;
        return newCart
      }
    }
    newCart.push(product);
  }
  return newCart;
}

module.exports = cartUtils;
