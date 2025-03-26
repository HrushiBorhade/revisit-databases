import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "mysecretpassword",
  database: "postgres",
});

async function createUsersAndAddressesTable() {
  await client.connect();
  const result = await client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS addresses;

    CREATE TABLE users(
        id  SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE addresses(
        id  SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    `);
  console.log("result", result);
}

// async function insertUserData(userInfo: {
//   username: string;
//   email: string;
//   password: string;
// }) {
//   await client.connect();
//   const result = await client.query(
//     `
//         INSERT INTO users(username, email, password) VALUES ($1, $2, $3);
//     `,
//     [userInfo.username, userInfo.email, userInfo.password]
//   );
//   console.log("result", result);
// }

createUsersAndAddressesTable();

// insertUserData({
//   username: "hrushi4",
//   email: "hrushi4@gmail.com",
//   password: "anotherpassword",
// });
