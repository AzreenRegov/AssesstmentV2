import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcryptjs";
import { connection } from "../db/index";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../Utils/constants";
import { IUser } from "../Utils/query";

export const resolvers: IResolvers = {
  Query: {
    getAllUsers: async () => {
      const query = "SELECT * FROM User";
      const [user] = await (await connection()).query<IUser[]>(query);

      console.log("No of users:" + user.length);
      console.log(user);

      return user;
    },

    getUserById: async (_, { id }) => {
      const query = `SELECT * FROM User WHERE id=?`;
      const [rows] = await (await connection()).query<IUser[]>(query, id);

      console.log(rows[0]);

      return { message: "Successful" };
    },
  },
  Mutation: {
    register: async (
      _,
      { username, firstName, lastName, phoneNo, email, password }
    ) => {
      let userEmail = "";
      let userUsername = "";

      try {
        //check for username in db
        const queryUsername = `SELECT * FROM User WHERE username=?`;
        const [existUsername] = await (
          await connection()
        ).query<IUser[]>(queryUsername, username);

        if (existUsername.length > 0) {
          return { message: "This username is already exist" };
        }

        //Check for email in db
        const queryEmail = `SELECT * FROM User WHERE email=?`;
        const [existEmail] = await (
          await connection()
        ).query<IUser[]>(queryEmail, email);

        if (existEmail.length > 0) {
          return { message: "This email is already exist" };
        }
      } catch (e) {
        console.log(e);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO User (username,firstName, lastName, email, phoneNo, password) VALUES ('${username}', '${firstName}', '${lastName}', '${email}', '${phoneNo}', '${hashedPassword}')`;
      const user = await (await connection()).execute(query);

      return { message: "Successfully Registered!" };
    },

    login: async (_, { username, password }) => {
      let userName = "";

      // Check username in db
      try {
        const query = `SELECT * FROM User WHERE username=?`;

        const [user] = await (
          await connection()
        ).query<IUser[]>(query, username);

        const userId = user[0].id;
        userName = user[0].username;
        const pass = user[0].password;

        // Check for password in db
        const valid = await bcrypt.compare(password, pass);
        if (!valid) {
          return { message: "Password Is Incorrect!" };
        }
        const accessToken = sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
          expiresIn: "30min",
        });

        return { accessToken: accessToken };
      } catch {
        // Username didn't exist in db
        if (!userName) {
          return { message: "Username Is Incorrect!" };
        }
      }
    },
  },
};
