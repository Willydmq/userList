import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

export const db = mysql2.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
});

export const initDB = async () => {
  try {
    console.log("Conectando a la base de datos...");

    const connection = await db;
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_ADDON_DB}`
    );
    await connection.query(`USE ${process.env.MYSQL_ADDON_DB}`);
    await connection.query(`CREATE TABLE IF NOT EXISTS usuarios (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

    console.log("Base de datos y tabla creadas exitosamente");
  } catch (error) {
    console.log("Error al conectar a la base de datos:", error);
    throw error;
  }
};
