import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function insertUser(
//   username: string,
//   password: string,
//   firstname: string,
//   lastname: string
// ) {
//   const res = await prisma.user.create({
//     data: {
//       username,
//       password,
//       firstname,
//       lastname,
//     },
//   });
//   console.log("res", res);
// }

// insertUser("hrushi_borhade","random", "hrushi" , "borhade")

/*
example_todo=# SELECT * FROM "User";
 id |    username    | password | firstname | lastname
----+----------------+----------+-----------+----------
  1 | hrushi_borhade | random   | hrushi    | borhade
(1 row)
*/

// type UpdateParam = {
//     firstname:string,
//     lastname:string
// }
// async function updateUser (username:string, {firstname,lastname}:UpdateParam)  {
//    const res = await prisma.user.update({
//     where: {username},
//     data:{
//         firstname,
//         lastname
//     }
//    })
//    console.log("res", res)

// }

// updateUser('hrushi_borhade', {firstname:"hrushikesh", lastname:"borhade"})

/*
example_todo=# SELECT * FROM "User";
 id |    username    | password | firstname | lastname
----+----------------+----------+-----------+----------
  1 | hrushi_borhade | random   | hrushi    | borhade
(1 row)

example_todo=# SELECT * FROM "User";
 id |    username    | password | firstname  | lastname
----+----------------+----------+------------+----------
  1 | hrushi_borhade | random   | hrushikesh | borhade
(1 row)

*/

// type Todo = {
//   title: string;
//   description?: string;
//   userId: number;
// };

// async function insertTodo({ title, description = "", userId }: Todo) {
//   const res = await prisma.todo.create({
//     data: {
//       title,
//       description,
//       userId,
//     },
//   });
//   console.log("res", res);
// }

// insertTodo({
//   title: "Learning prisma",
//   description: "learning prisma by building a todo app",
//   userId: 1,
// });

async function getUserAndTodo(userId: number) {
  const res = await prisma.todo.findMany({
    where: {
      userId,
    },
    select: {
      title: true,
      description: true,
      user: true,
    },
  });
  console.log("res", res);
}

getUserAndTodo(1);

// example_todo=#  SELECT "User"."username",  title, description  FROM "Todo" JOIN "User" ON "Todo"."userId" = "User"."id";
//     username    |      title      |              description
// ----------------+-----------------+----------------------------------------
//  hrushi_borhade | Learning prisma | learning prisma by building a todo app
// (1 row)
