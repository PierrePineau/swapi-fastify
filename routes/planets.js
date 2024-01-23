const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const routes = async (app) => {
  const tags = ["Planets"];

  /**
   * CREATE ONE PLANET
   */
  //   app.post(
  //     "/planets",
  //     {
  //       schema: {
  //         tags: ["Planet"],
  //         summary: "Create a new planet",
  //         //   params: {
  //         //     type: "object",
  //         //     properties: {
  //         //       id: {
  //         //         type: "string",
  //         //         description: "user id",
  //         //       },
  //         //     },
  //         //   },
  //         body: {
  //           type: "object",
  //           properties: {
  //             name: {
  //               type: "string",
  //               required: ["name"],
  //               exemple: "Lorem ipsum",
  //             },
  //             //   obj: {
  //             //     type: "object",
  //             //     properties: {
  //             //       some: { type: "string" },
  //             //     },
  //             //   },
  //           },
  //         },
  //         response: {
  //           201: {
  //             description: "Successful response",
  //             type: "object",
  //             properties: {
  //               name: { type: "string" },
  //             },
  //           },
  //           // default: {
  //           //   description: "Default response",
  //           //   type: "object ",
  //           //   properties: {
  //           //     foo: { type: "string" },
  //           //   },
  //           // },
  //         },
  //         security: [
  //           {
  //             JWT: [],
  //           },
  //         ],
  //       },
  //     },
  //     async (request, reply) => {
  //       const { name, terrain } = request.body;

  //       const planet = await prisma.planet.create({
  //         data: {
  //           name,
  //           terrain,
  //         },
  //       });

  //       reply.send(planet);
  //     }
  //   );

  /**
   * GET ALL PLANET
   */

  app.get(
    "/planets",
    {
      schema: {
        description: "Get Planets",
        tags: tags,
        summary: "Get all Planets",
        params: {
          type: "object",
          properties: {
            page: {
              type: "number",
              default: 1,
            },
            limit: {
              type: "number",
              default: 10,
            },
            order: {
              type: "string",
              default: "DESC",
              enum: ["ASC", "DESC"],
            },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              count: {
                type: "number",
              },
              page: {
                type: "number",
              },
              limit: {
                type: "number",
              },
              data: {
                type: "array",
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const page = request.params.page || 1;
        const limit = request.params.limit || 10;
        const order = request.params.order == "ASC" ? "asc" : "desc";

        const planets = await prisma.planets.findMany();

        return reply.send({
          count: planets.length,
          page,
          limit,
          data: planets,
        });
      } catch (error) {
        console.error("Erreur Prisma :", error);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );

  /**
   * GET ONE PLANET BY ID
   */

  //   app.get("/planets/:id", async (request, reply) => {
  //     const { id } = request.params;

  //     const planet = await prisma.planet.findUnique({
  //       where: {
  //         id: Number(id),
  //       },
  //     });

  //     reply.send(planet);
  //   });

  //   /**
  //    * UPDATE ONE PLANET
  //    */

  //   app.put("/planets/:id", async (request, reply) => {
  //     const { id } = request.params;
  //     const { name, terrain } = request.body;

  //     const planet = await prisma.planet.update({
  //       where: {
  //         id: Number(id),
  //       },
  //       data: {
  //         name,
  //         terrain,
  //       },
  //     });

  //     reply.send(planet);
  //   });

  //   /**
  //    * DELETE ONE PLANET
  //    */

  //   app.delete("/planets/:id", async (request, reply) => {
  //     const { id } = request.params;

  //     const planet = await prisma.planet.delete({
  //       where: {
  //         id: Number(id),
  //       },
  //     });

  //     reply.send(planet);
  //   });
};

module.exports = {
  routes: routes,
};
