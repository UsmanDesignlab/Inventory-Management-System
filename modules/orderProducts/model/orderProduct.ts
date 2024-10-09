import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface orderProducts {
  id?:number;
  orderId?: number;
  productId?: number;
}

@Table({
  tableName: 'orderProduct',
  timestamps: true,
})
export class orderProduct extends Model<orderProducts> implements orderProducts {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
   id?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
   orderId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    productId?: number;
}