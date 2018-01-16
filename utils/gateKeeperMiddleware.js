const gatekeeperMiddleware = {}

gatekeeperMiddleware.isAdmin = function(req, res, next){
  req.user && req.user.isAdmin ?
    next() : res.sendStatus(401);
}

gatekeeperMiddleware.isUser = function(req, res, next) {
  req.user && Number(req.user.id) === Number(req.params.userId) ?
    next() : res.sendStatus(401);
}

module.exports = gatekeeperMiddleware
