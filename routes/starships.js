// const fastify = require("fastify");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// const app = fastify({ logger: true });
// /**
//  * CREATE ONE STARSHIPS
//  */
// app.post(
//   "/starships",
//   {
//     schema: {
//       tags: ["Starships"],
//       summary: "Create a new Starships",
//       //   params: {
//       //     type: "object",
//       //     properties: {
//       //       id: {
//       //         type: "string",
//       //         description: "user id",
//       //       },
//       //     },
//       //   },
//       body: {
//         type: "object",
//         properties: {
//           name: {
//             type: "string",
//             required: ["name"],
//             exemple: "Lorem ipsum",
//           },
//           //   obj: {
//           //     type: "object",
//           //     properties: {
//           //       some: { type: "string" },
//           //     },
//           //   },
//         },
//       },
//       response: {
//         201: {
//           description: "Successful response",
//           type: "object",
//           properties: {
//             name: { type: "string" },
//           },
//         },
//         // default: {
//         //   description: "Default response",
//         //   type: "object ",
//         //   properties: {
//         //     foo: { type: "string" },
//         //   },
//         // },
//       },
//       security: [
//         {
//           JWT: [],
//         },
//       ],
//     },
//   },
//   async (request, reply) => {
//     const { model, pk } = request.body;

//     const starship = await prisma.starship.create({
//       data: {
//         model,
//         pk,
//       },
//     });

//     reply.send(starship);
//   }
// );

// /**
//  * GET ALL STARSHIPS
//  */

// app.get("/starships", async (request, reply) => {
//   const starships = await prisma.starship.findMany();

//   reply.send(starships);
// });

// /**
//  * GET ONE STARSHIPS BY ID
//  */

// app.get("/starships/:id", async (request, reply) => {
//   const { id } = request.params;

//   const starship = await prisma.starship.findUnique({
//     where: {
//       id: Number(id),
//     },
//   });

//   reply.send(starship);
// });

// /**
//  * UPDATE ONE STARSHIPS
//  */

// app.put("/starships/:id", async (request, reply) => {
//   const { id } = request.params;
//   const { model, pk } = request.body;

//   const starship = await prisma.starship.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       model,
//       pk,
//     },
//   });

//   reply.send(starship);
// });

// /**
//  * DELETE ONE STARSHIP
//  */

// app.delete("/starships/:id", async (request, reply) => {
//   const { id } = request.params;

//   const starship = await prisma.starship.delete({
//     where: {
//       id: Number(id),
//     },
//   });

//   reply.send(starship);
// });
