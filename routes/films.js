const fastify = require("fastify");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = fastify({ logger: true });

/**
 * CREATE ONE FILMS
 */
app.post("/films", async (request, reply) => {
  const { title, description, year } = request.body;

  const film = await prisma.film.create({
    data: {
      title,
      description,
      year,
    },
  });

  reply.send(film);
});

/**
 * GET ALL FILMS
 */

app.get("/films", async (request, reply) => {
  const films = await prisma.film.findMany();

  reply.send(films);
});

/**
 * GET ONE FILMS BY ID
 */

app.get("/films/:id", async (request, reply) => {
  const { id } = request.params;

  const films = await prisma.people.findUnique({
    where: {
      id: Number(id),
    },
  });

  reply.send(films);
});

/**
 * UPDATE ONE FILMS
 */

app.put("/films/:id", async (request, reply) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const film = await prisma.film.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });

  reply.send(film);
});

/**
 * DELETE ONE FILMS
 */

app.delete("/films/:id", async (request, reply) => {
  const { id } = request.params;

  const film = await prisma.film.delete({
    where: {
      id: Number(id),
    },
  });

  reply.send(film);
});
