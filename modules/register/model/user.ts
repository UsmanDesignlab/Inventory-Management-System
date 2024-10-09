import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface User {
  id?: number;
  username?: string;
  email?: string;
  password: string ; 
  role:string;
  storeId?:number;
}

@Table({
  tableName: 'user',
  timestamps: true,
})
export class Users extends Model<User> implements User {
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
  username?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string;

  
  @Column({
    type: DataType.ENUM("Admin","storeManager","Employee"),
    allowNull: true,
  })
    role!: string; 

    
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  storeId?: number; 
  }