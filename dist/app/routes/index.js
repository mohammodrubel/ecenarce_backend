"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_router_1 = require("../modules/user/user.router");
const category_route_1 = require("../modules/category/category.route");
const brand_routes_1 = require("../modules/brand/brand.routes");
const product_router_1 = require("../modules/product/product.router");
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_router_1.userRouter,
    },
    {
        path: '/category',
        route: category_route_1.categoryRouter,
    },
    {
        path: '/brand',
        route: brand_routes_1.brandRouter,
    },
    {
        path: '/products',
        route: product_router_1.productRouter,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
