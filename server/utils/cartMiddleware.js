const cartMiddleware = {}

// OB/EC: recommend changing the name, because this isn't exactly "middleware", could just be `cartUtil`
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
