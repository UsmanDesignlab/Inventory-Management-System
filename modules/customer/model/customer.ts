import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface customers {
  id?: number;
  name?: string;
  contactInfo?: string;
  email?:string;
}

@Table({
  tableName: 'customer',
  timestamps: true,
})
export class Customer extends Model<customers> implements customers {
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
   contactInfo?:string;

   @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   email?:string;
}