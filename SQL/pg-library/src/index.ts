import { Client } from "pg";

const client = new Client({
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

async function insertUserAndAddressData(
  userInfo: {
    username: string;
    email: string;
    password: string;
  },
  addressInfo: {
    city: string;
    country: string;
    street: string;
    pincode: string;
  }
) {
  try {
    await client.connect();

    await client.query(`BEGIN`);

    const userRes = await client.query(
      `
        INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id;
    `,
      [userInfo.username, userInfo.email, userInfo.password]
    );
    console.log("userRes", userRes);

    const userId = userRes.rows[0].id;
    if (!userId) throw new Error("user data insertion failed!");

    const addressRes = await client.query(
      `
        INSERT INTO addresses (user_id, city, country, street, pincode) VALUES($1, $2, $3, $4, $5) RETURNING id;
      `,
      [
        userId,
        addressInfo.city,
        addressInfo.country,
        addressInfo.street,
        addressInfo.pincode,
      ]
    );
    console.log("addressRes", addressRes);
    if (addressRes.rows.length < 1)
      throw new Error("Address data insertion failed");

    await client.query("COMMIT");
    console.log(
      "Transaction Completed ✅: User and Address inserted successfully"
    );
  } catch (e) {
    console.error("Transaction Failed: Something went wrong ❌ ", e);
  }
}

// createUsersAndAddressesTable();

insertUserAndAddressData(
  {
    username: "hrushi",
    email: "hrushi@gmail.com",
    password: "randompassword",
  },
  {
    city: "Pune",
    country: "India",
    street: "New street",
    pincode: "123456",
  }
);
