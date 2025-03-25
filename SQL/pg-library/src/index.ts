import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "mysecretpassword",
  database: "postgres",
});

// async function createUsersTable() {
//   const result = await client.query(`
//     CREATE TABLE users(
//         id  SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );`);
//   console.log("result", result);
// }

async function insertUserData(userInfo: {
  username: string;
  email: string;
  password: string;
}) {
  await client.connect();
  const result = await client.query(
    `
        INSERT INTO users(username, email, password) VALUES ($1, $2, $3);
    `,
    [userInfo.username, userInfo.email, userInfo.password]
  );
  console.log("result", result);
}

// createUsersTable();
insertUserData({
  username: "hrushi4",
  email: "hrushi4@gmail.com",
  password: "anotherpassword",
});
