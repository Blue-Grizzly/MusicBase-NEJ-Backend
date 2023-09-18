import mysql from "mysql2";
import "dotenv/config";
const pEnv = process.env;

const dbconfig = {
  host: pEnv.MYSQL_HOST,
  port: pEnv.MYSQL_PORT,
  user: pEnv.MYSQL_USER,
  database: pEnv.MYSQL_DATABASE,
  password: pEnv.MYSQL_PASSWORD,
  multipleStatements: true,
};

if (process.env.MYSQL_CERT) {
  dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
}

const connection = mysql.createConnection(dbconfig);

export { connection };
