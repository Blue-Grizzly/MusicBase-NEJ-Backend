import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "music_Base",
  password: "CPBBTS#1314a",
  multipleStatements: true,
});

export { connection };
