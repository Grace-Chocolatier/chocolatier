const orderUtils = {}


orderUtils.makeOrder = (userId, currentCart) =>
    axios.post(`/api/orders/${userId}`, currentCart)
    .then(res => res.data)
    .catch(err => console.log(err))

module.exports = orderUtils;