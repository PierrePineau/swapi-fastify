const {Planet} = require("../models/index")

const routes = async (app) => {
  const tags = ["Planets"];

  /**
   * CREATE ONE PLANET
   */
    app.post(
      "/planet",
      {
        schema: {
          tags: tags,
          summary: "Create a new planet",
          body: {
            type: "object",
            properties: {
              climate: {
                type: "string",
                default: "test"
              },
              surface_water: {
                type: "string",
                default: "test"
              },
              name: {
                type: "string",
                default: "test"
              },
              diameter: {
                type: "string",
                default: "test"
              },
              rotation_period: {
                type: "string",
                default: "test"
              },
              terrain: {
                type: "string",
                default: "test"
              },
              gravity: {
                type: "string",
                default: "test"
              },
              orbital_period: {
                type: "string",
                default: "test"
              },
              population: {
                type: "string",
                default: "test"
              },
            },
          },
        },
      },
      async (request, reply) => {
        const { climate, surface_water, name, diameter, rotation_period, terrain, gravity, orbital_period, population } = request.body;

        const planet = await Planet.create({
          climate: climate,
          surface_water: surface_water,
          name: name,
          diameter: diameter,
          rotation_period: rotation_period,
          terrain: terrain,
          gravity: gravity,
          orbital_period: orbital_period,
          population: population,
        });

        reply.send({
          message: "Planet created",
          data : planet
        });
      }
    );

  /**
   * GET ALL PLANET
   */
  app.get(
    "/planets",
    {
      schema: {
        tags: tags,
        summary: "Find all planets"
      }
    },
    async (request, reply) => {
      const planets = await Planet.find();
      reply.send({
        message: "Find all planets",
        data: planets
      })
    }
  )

  /**
   * GET ONE PLANET
   */
  app.post(
    "/planet/id",
    {
      schema: {
        tags: tags,
        summary: "Find one planet",
        body: {
          type: "object",
          properties: {
            id : {
              type: "number",
              default: "1"
            }
          }
        }
      }
    },
    async (request, reply) => {
      const {id} = request.body;
      const planet = await Planet.findById(id);
      reply.send({
        message: "Find one planet",
        data: planet,
      })
    }
  )
  // app.get(
  //   "/planets",
  //   {
  //     schema: {
  //       description: "Get Planets",
  //       tags: tags,
  //       summary: "Get all Planets",
  //       params: {
  //         type: "object",
  //         properties: {
  //           page: {
  //             type: "number",
  //             default: 1,
  //           },
  //           limit: {
  //             type: "number",
  //             default: 10,
  //           },
  //           order: {
  //             type: "string",
  //             default: "DESC",
  //             enum: ["ASC", "DESC"],
  //           },
  //         },
  //       },
  //       response: {
  //         200: {
  //           description: "Successful response",
  //           type: "object",
  //           properties: {
  //             count: {
  //               type: "number",
  //             },
  //             page: {
  //               type: "number",
  //             },
  //             limit: {
  //               type: "number",
  //             },
  //             data: {
  //               type: "array",
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   async (request, reply) => {
  //     try {
  //       const page = request.params.page || 1;
  //       const limit = request.params.limit || 10;
  //       const order = request.params.order == "ASC" ? "asc" : "desc";

  //       const planets = await prisma.planets.findMany();

  //       return reply.send({
  //         count: planets.length,
  //         page,
  //         limit,
  //         data: planets,
  //       });
  //     } catch (error) {
  //       console.error("Erreur Prisma :", error);
  //       reply.status(500).send({ error: "Internal Server Error" });
  //     }
  //   }
  // );

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
