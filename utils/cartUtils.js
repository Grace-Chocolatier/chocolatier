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
  let newCart = [];
  if (cart.length === 0) newCart.push(product)
  else {
    for (var i = 0; i < cart.length; i++){
      let newItem = cart[i];
      if (cart[i].id === product.id) newItem.quantity += product.quantity;
      newCart.push(newItem);
    }
  }
  return newCart;
}

module.exports = cartUtils;
