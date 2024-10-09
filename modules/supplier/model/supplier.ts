import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface suppliers {
  id?: number;
  name?: string;
  contactInfo?: string;
  paymentDetails?:string;
}

@Table({
  tableName: 'supplier',
  timestamps: true,
})
export class Supplier extends Model<suppliers> implements suppliers {
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
   contactInfo?: string;

   @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   paymentDetails?:string;
}