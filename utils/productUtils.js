const productUtils = {}

productUtils.edit = function(products, product){
  console.log('utility', products)
  let productList = products.slice();
  if (products.length === 0) productList.push(product)
  else {
    for (let i = 0; i < productList.length; i++){
      if (productList[i].id === product.id) {
        productList[i] = product;
        return productList
      }
    }
    productList.push(product);
  }
  return productList;
}

module.exports = productUtils;
