
import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface orders {
  id?: number;
  status?: string;
  customerId?: number;
  storeId?: number; 
  shipmentDate?:string;
}

@Table({
  tableName: 'order',
  timestamps: true,
})
export class Order extends Model<orders> implements orders {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
   id?: number;

  @Column({
    type: DataType.ENUM("Delivered","Pending","Shipped"),
    allowNull: false,
  })
    status?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
    storeId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId!: number;

  
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    shipmentDate!:string; 
  }