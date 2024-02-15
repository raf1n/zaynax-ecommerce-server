const express = require("express");
const AuthRoutes = require("../modules/auth/auth.routes");
const ProductRoutes = require("../modules/Product/product.routes");
const PromotionRoutes = require("../modules/Promotion/promotion.routes");
const OrderRoutes = require("../modules/Order/order.routes");

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  { path: "/product", route: ProductRoutes },
  { path: "/promotion", route: PromotionRoutes },
  { path: "/order", route: OrderRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
