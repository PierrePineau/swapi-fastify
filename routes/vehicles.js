// const fastify = require("fastify");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// const app = fastify({ logger: true });
// /**
//  * CREATE ONE VEHICLE
//  */

// app.post(
//   "/vehicles",
//   {
//     schema: {
//       tags: ["Vehicles"],
//       summary: "Create a new vehicle",
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
//     const { name, email } = request.body;

//     const people = await prisma.people.create({
//       data: {
//         name,
//         email,
//       },
//     });

//     reply.send(people);
//   }
// );

// /**
//  * GET ALL VEHICLES
//  */

// app.get(
//   "/vehicles",
//   {
//     schema: {
//       tags: ["Vehicles"],
//       summary: "Get all Vehicles",
//       params: {
//         type: "object",
//         properties: {
//           id: {
//             type: "string",
//             description: "user id",
//           },
//         },
//       },
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
//     const peoples = await prisma.people.findMany();

//     reply.send(peoples);
//   }
// );

// /**
//  * GET ONE VEHICLE BY ID
//  */

// app.get(
//   "/vehicles/:id",
//   {
//     schema: {
//       tags: ["Vehicles"],
//       summary: "Get One vehicle by id",
//       params: {
//         type: "object",
//         properties: {
//           id: {
//             type: "string",
//             description: "user id",
//           },
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
//     const { id } = request.params;

//     const people = await prisma.people.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });

//     reply.send(people);
//   }
// );

// /**
//  * UPDATE ONE VEHICLE
//  */

// app.put(
//   "/vehicles/:id",
//   {
//     schema: {
//       tags: ["Vehicles"],
//       summary: "Update One vehicle",
//       params: {
//         type: "object",
//         properties: {
//           id: {
//             type: "string",
//             description: "user id",
//           },
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
//     const { id } = request.params;
//     const { name, email } = request.body;

//     const people = await prisma.people.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         name,
//         email,
//       },
//     });

//     reply.send(people);
//   }
// );

// /**
//  * DELETE ONE VEHICLE
//  */

// app.delete(
//   "/vehicles/:id",
//   {
//     schema: {
//       tags: ["Vehicles"],
//       summary: "Delete One vehicle",
//       params: {
//         type: "object",
//         properties: {
//           id: {
//             type: "string",
//             description: "user id",
//           },
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
//     const { id } = request.params;

//     const people = await prisma.people.delete({
//       where: {
//         id: Number(id),
//       },
//     });

//     reply.send(people);
//   }
// );
