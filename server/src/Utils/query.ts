import { RowDataPacket } from "mysql2";

export interface IUser extends RowDataPacket {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  password: string;
}
