import mysql from "mysql2/promise";

const options = {
  host: "localhost",
  user: "root",
  password: "regovTech@1",
  database: "assesstmentV2",
};

export async function connection() {
  return await mysql.createConnection(options);
}
