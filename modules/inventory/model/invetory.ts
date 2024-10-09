import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface inventory {
  id?:number,
  storeId?: number, 
  productId?: number, 
  quantity?: number,
  damaged?: number, 
  received?: number, 
  shipped?: number, 
}

@Table({
  tableName: 'inventory',
  timestamps: true,
})
export class Inventory extends Model<inventory> implements inventory {
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
   
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    quantity?: number;


  @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
   damaged?: number;

   @Column({
      type: DataType.INTEGER,
       allowNull: false,
      })
     received?: number;

       @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
     shipped?: number;

}