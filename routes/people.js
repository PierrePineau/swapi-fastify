const fastify = require("fastify");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = fastify({ logger: true });
/**
 * CREATE ONE PEOPLE
 */
app.post(
  "/peoples",
  {
    schema: {
      tags: ["People"],
      summary: "Create a new people",
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
    const { name, email } = request.body;

    const people = await prisma.people.create({
      data: {
        name,
        email,
      },
    });

    reply.send(people);
  }
);

/**
 * GET ALL PEOPLE
 */

app.get(
  "/peoples",
  {
    schema: {
      tags: ["People"],
      summary: "Get all peoples",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
        },
      },
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
    const peoples = await prisma.people.findMany();

    reply.send(peoples);
  }
);

/**
 * GET ONE PEOPLE BY ID
 */

app.get(
  "/peoples/:id",
  {
    schema: {
      tags: ["People"],
      summary: "Get One people",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
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
    const { id } = request.params;

    const people = await prisma.people.findUnique({
      where: {
        id: Number(id),
      },
    });

    reply.send(people);
  }
);

/**
 * UPDATE ONE PEOPLE
 */

app.put(
  "/peoples/:id",
  {
    schema: {
      tags: ["People"],
      summary: "Update One people",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
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
    const { id } = request.params;
    const { name, email } = request.body;

    const people = await prisma.people.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    });

    reply.send(people);
  }
);

/**
 * DELETE ONE PEOPLE
 */

app.delete(
  "/peoples/:id",
  {
    schema: {
      tags: ["People"],
      summary: "Delete One people",
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "user id",
          },
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
    const { id } = request.params;

    const people = await prisma.people.delete({
      where: {
        id: Number(id),
      },
    });

    reply.send(people);
  }
);
