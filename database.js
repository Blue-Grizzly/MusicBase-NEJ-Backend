import mysql from "mysql2";
import "dotenv/config";
const pEnv = process.env;

const connection = mysql.createConnection({
  host: pEnv.MYSQL_HOST,
  port: pEnv.MYSQL_PORT,
  user: pEnv.MYSQL_USER,
  database: pEnv.MYSQL_DATABASE,
  password: pEnv.MYSQL_PASSWORD,
  multipleStatements: true,
});

export { connection };
