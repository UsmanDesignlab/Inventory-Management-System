import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface sales {
  id?:number,
  storeId?: number, 
  productId?: number, 
  sales?: number,
  profit?: number, 
  dateRange?: Date, 
}


@Table({
  tableName: 'salesReports',
  timestamps: true,
})
export class Sales extends Model<sales> implements sales {
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
    sales?: number;


  @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
   profit?: number;

   @Column({
      type: DataType.DATEONLY,
       allowNull: false,
      })
     dateRange?: Date;
}