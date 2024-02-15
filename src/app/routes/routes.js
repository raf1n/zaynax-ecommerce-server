const express = require("express");
const AuthRoutes = require("../modules/auth/auth.routes");
const ProductRoutes = require("../modules/Product/product.routes");

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  { path: "/product", route: ProductRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
