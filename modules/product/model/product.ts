import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface  Product {
  id?:number;
  name?: String,
  barcode?: String,
  price?: number,
  description?: String,
}

@Table({
  tableName: 'product',
  timestamps: true,
})
export class Products extends Model<Product> implements Product {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
   id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    barcode?: string;

 @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
      price?: number;

  @Column({
      type: DataType.STRING,
      allowNull: false,
      })
      description?: string;
}