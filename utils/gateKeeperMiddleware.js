const gateKeeper = {}

gateKeeper.isAdmin = function(req, res, next){
  req.user && req.user.isAdmin ?
    next() : res.sendStatus(401)
}

module.exports = gateKeeper
