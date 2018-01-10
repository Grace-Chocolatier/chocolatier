const cartMiddleware = {}

cartMiddleware.removeItemFromCart = (cart, item) => {
    let newCart = [];
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].id !== item.id) {
        newCart.push(item);
      }
    }
    return newCart;
}

module.exports = cartMiddleware;
