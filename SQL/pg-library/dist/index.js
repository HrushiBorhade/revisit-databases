"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "mysecretpassword",
    database: "postgres",
});
// async function createUsersAndAddressesTable() {
//   await client.connect();
//   const result = await client.query(`
//     DROP TABLE IF EXISTS users;
//     DROP TABLE IF EXISTS addresses;
//     CREATE TABLE users(
//         id  SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );
//     CREATE TABLE addresses(
//         id  SERIAL PRIMARY KEY,
//         user_id INTEGER NOT NULL,
//         city VARCHAR(100) NOT NULL,
//         country VARCHAR(100) NOT NULL,
//         street VARCHAR(255) NOT NULL,
//         pincode VARCHAR(20),
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     );
//     `);
//   console.log("result", result);
// }
// async function insertUserAndAddressData(
//   userInfo: {
//     username: string;
//     email: string;
//     password: string;
//   },
//   addressInfo: {
//     city: string;
//     country: string;
//     street: string;
//     pincode: string;
//   }
// ) {
//   try {
//     await client.connect();
//     await client.query(`BEGIN`);
//     const userRes = await client.query(
//       `
//         INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id;
//     `,
//       [userInfo.username, userInfo.email, userInfo.password]
//     );
//     console.log("userRes", userRes);
//     const userId = userRes.rows[0].id;
//     if (!userId) throw new Error("user data insertion failed!");
//     const addressRes = await client.query(
//       `
//         INSERT INTO addresses (user_id, city, country, street, pincode) VALUES($1, $2, $3, $4, $5) RETURNING id;
//       `,
//       [
//         userId,
//         addressInfo.city,
//         addressInfo.country,
//         addressInfo.street,
//         addressInfo.pincode,
//       ]
//     );
//     console.log("addressRes", addressRes);
//     if (addressRes.rows.length < 1)
//       throw new Error("Address data insertion failed");
//     await client.query("COMMIT");
//     console.log(
//       "Transaction Completed ✅: User and Address inserted successfully"
//     );
//   } catch (e) {
//     console.error("Transaction Failed: Something went wrong ❌ ", e);
//   }
// }
function getUserAndAddress(username) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const res = yield client.query(`SELECT username,email, a.street , a.city, a.country, a.pincode FROM users JOIN addresses AS a ON users.id = a.user_id WHERE username=$1;`, [username]);
        console.log("res", res);
    });
}
// createUsersAndAddressesTable();
// insertUserAndAddressData(
//   {
//     username: "hrushi",
//     email: "hrushi@gmail.com",
//     password: "randompassword",
//   },
//   {
//     city: "Pune",
//     country: "India",
//     street: "New street",
//     pincode: "123456",
//   }
// );
getUserAndAddress("hrushi");
