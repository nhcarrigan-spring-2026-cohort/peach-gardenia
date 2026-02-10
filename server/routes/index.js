const wishlistsRoutes = require('./wishlist')
const caseworkerRoutes = require('./caseworker')

function mountRoutes(app) {
  //routes for users to view wishlists
  app.use('/', wishlistsRoutes)

  //routes for caseworkers portal
  app.use('/caseworker', caseworkerRoutes)

  //Future possible routes
  // A route to refresh the wishlists 
  // An admin route for developers to view all caseworker accounts 
}

module.exports = {
  mountRoutes,
}
