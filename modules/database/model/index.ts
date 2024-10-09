import { Sequelize } from "sequelize-typescript";
import { Users } from "../../register/model/user";
import { Store } from "../../store/model/store";
import { Products } from "../../product/model/product";
import { Supplier } from "../../supplier/model/supplier";
import { Customer } from "../../customer/model/customer";
import { Inventory } from "../../inventory/model/invetory";
import { Order } from "../../order/model/order";
import { orderProduct } from "../../orderProducts/model/orderProduct";
import { Sales } from "../../salesReport/model/salesReport";
import { storeProduct } from "../../storeProducts/model/storeProduct";
import { supplierProduct } from "../../supplierProducts/model/supplierProduct";



const sequelize = new Sequelize('inventory', 'root', '03466787660uU@', {
  host: 'localhost',
  logging: false,
  dialect: "mysql",
  models: [Users, Store, Products, Supplier, Customer, Inventory, Order, orderProduct, Sales, storeProduct, supplierProduct]
});


Store.hasMany(Users, { foreignKey: "storeId" });
Users.belongsTo(Store, { foreignKey: "storeId" });

Store.belongsToMany(Products, { through: 'storeProduct', foreignKey: 'storeId' });
Products.belongsToMany(Store, { through: 'storeProduct', foreignKey: 'productId' });

Order.belongsToMany(Products, { through: 'orderProduct', foreignKey: 'orderId' });
Products.belongsToMany(Order, { through: 'orderProduct', foreignKey: "productId" });

Supplier.belongsToMany(Products, { through: 'supplierProduct', foreignKey: "supplierId" });
Products.belongsToMany(Supplier, { through: 'supplierProduct', foreignKey: 'productId' });

Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

Inventory.belongsTo(Store, { foreignKey: "storeId" });
Inventory.belongsTo(Products, { foreignKey: "productId" });


Sales.belongsTo(Store, { foreignKey: "storeId" });
Sales.belongsTo(Products, { foreignKey: "productId" });


Order.belongsTo(Store, { foreignKey: "storeId" });


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export default sequelize;