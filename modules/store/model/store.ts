import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface store {
  id?: number;
  name?: string;
  location?: string;
}

@Table({
  tableName: 'store',
  timestamps: true,
})
export class Store extends Model<store> implements store {
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
   location?: string;
}