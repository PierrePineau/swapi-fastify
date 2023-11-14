const fastify = require("fastify");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = fastify({ logger: true });
/**
 * CREATE ONE PLANET
 */
app.post(
  "/planets",
  {
    schema: {
      tags: ["Planet"],
      summary: "Create a new planet",
      //   params: {
      //     type: "object",
      //     properties: {
      //       id: {
      //         type: "string",
      //         description: "user id",
      //       },
      //     },
      //   },
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: ["name"],
            exemple: "Lorem ipsum",
          },
          //   obj: {
          //     type: "object",
          //     properties: {
          //       some: { type: "string" },
          //     },
          //   },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        // default: {
        //   description: "Default response",
        //   type: "object ",
        //   properties: {
        //     foo: { type: "string" },
        //   },
        // },
      },
      security: [
        {
          JWT: [],
        },
      ],
    },
  },
  async (request, reply) => {
    const { name, terrain } = request.body;

    const planet = await prisma.planet.create({
      data: {
        name,
        terrain,
      },
    });

    reply.send(planet);
  }
);

/**
 * GET ALL PLANET
 */

app.get("/planets", async (request, reply) => {
  const planets = await prisma.planet.findMany();

  reply.send(planets);
});

/**
 * GET ONE PLANET BY ID
 */

app.get("/planets/:id", async (request, reply) => {
  const { id } = request.params;

  const planet = await prisma.planet.findUnique({
    where: {
      id: Number(id),
    },
  });

  reply.send(planet);
});

/**
 * UPDATE ONE PLANET
 */

app.put("/planets/:id", async (request, reply) => {
  const { id } = request.params;
  const { name, terrain } = request.body;

  const planet = await prisma.planet.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      terrain,
    },
  });

  reply.send(planet);
});

/**
 * DELETE ONE PLANET
 */

app.delete("/planets/:id", async (request, reply) => {
  const { id } = request.params;

  const planet = await prisma.planet.delete({
    where: {
      id: Number(id),
    },
  });

  reply.send(planet);
});
