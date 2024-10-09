import express from "express";
import methodOverride from "method-override";
import cookieParser from 'cookie-parser';
import path from "path";
import sequelize from "./modules/database/model/index";
import Store from "./modules/store/routes/store"
import Supplier from "./modules/supplier/routes/supplier"
import Product from "./modules/product/routes/product"
import Customer from "./modules/customer/routes/customer"
import orderProduct from "./modules/orderProducts/routes/orderProduct"
import storeProduct from "./modules/storeProducts/routes/storeProduct"
import supplierProduct from "./modules/supplierProducts/routes/supplierProduct"
import inventory from "./modules/inventory/routes/inventory"
import salesReport from "./modules/salesReport/routes/salesReport"
import Order from "./modules/order/routes/order"
import register from "./modules/register/routes/register"
import admin from "./modules/admin/routes/admin"
import { isLoggedIn, isAdmin, isEmployee, isStoreManager, hasAccess, isAdminOrStoreManager } from "./modules/middleware/isLog";
import passport from 'passport';
import googleAuthRoutes from './modules/google/route/google'; // Adjust path to your routes file

const app = express();


// Initialize passport middleware
app.use(passport.initialize());

// Use the Google Auth routes




// Middleware setup
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())



// Middleware for Public folder
app.use(express.static(path.join(__dirname, "public")))

const port = 3009;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api", register);
app.use('/', googleAuthRoutes);
app.use("/api", admin)
app.use("/api/store", isLoggedIn, hasAccess, Store)
app.use("/api/supplier", isLoggedIn, isAdminOrStoreManager, Supplier)
app.use("/api/product", isLoggedIn, isAdminOrStoreManager, Product)
app.use("/api/customer", isLoggedIn, isAdminOrStoreManager, Customer)
app.use("/api/orderProduct", isLoggedIn, isAdmin, orderProduct)
app.use("/api/storeProduct", isLoggedIn, isAdminOrStoreManager, storeProduct)
app.use("/api/supplierProduct", isLoggedIn, isAdminOrStoreManager, supplierProduct)
app.use("/api/inventory", isLoggedIn, isAdminOrStoreManager, inventory)
app.use("/api/salesReport", isLoggedIn, isAdmin, salesReport)
app.use("/api/order", isLoggedIn, isAdmin, Order)


sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});