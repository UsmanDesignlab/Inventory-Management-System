import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface storeProducts {
  id?:number;
  storeId?: number;
  productId?: number;
}

@Table({
  tableName: 'storeProduct',
  timestamps: true,
})
export class storeProduct extends Model<storeProducts> implements storeProducts {
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
   storeId?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    productId?: number;

}