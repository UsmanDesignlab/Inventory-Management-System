import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface supplierProducts {
  id?:number;
  supplierId?: number;
  productId?: number;
}

@Table({
  tableName: 'supplierProduct',
  timestamps: true,
})
export class supplierProduct extends Model<supplierProducts> implements supplierProducts {
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
   supplierId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    productId?: number;
}