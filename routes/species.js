// const fastify = require("fastify");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// const app = fastify({ logger: true });
// /**
//  * CREATE ONE SPECIE
//  */
// app.post(
//   "/species",
//   {
//     schema: {
//       tags: ["Specie"],
//       summary: "Create a new Specie",
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
//     const { name, classification } = request.body;

//     const specie = await prisma.specie.create({
//       data: {
//         name,
//         classification,
//       },
//     });

//     reply.send(specie);
//   }
// );

// /**
//  * GET ALL SPECIE
//  */

// app.get("/species", async (request, reply) => {
//   const species = await prisma.specie.findMany();

//   reply.send(species);
// });

// /**
//  * GET ONE SPECIE BY ID
//  */

// app.get("/species/:id", async (request, reply) => {
//   const { id } = request.params;

//   const specie = await prisma.specie.findUnique({
//     where: {
//       id: Number(id),
//     },
//   });

//   reply.send(specie);
// });

// /**
//  * UPDATE ONE SPECIE
//  */

// app.put("/species/:id", async (request, reply) => {
//   const { id } = request.params;
//   const { name, classification } = request.body;

//   const specie = await prisma.specie.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       name,
//       classification,
//     },
//   });

//   reply.send(specie);
// });

// /**
//  * DELETE ONE SPECIE
//  */

// app.delete("/species/:id", async (request, reply) => {
//   const { id } = request.params;

//   const specie = await prisma.specie.delete({
//     where: {
//       id: Number(id),
//     },
//   });

//   reply.send(specie);
// });
