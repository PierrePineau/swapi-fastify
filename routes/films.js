// const {PrismaClient} = require("@prisma/client")
// const prisma = new PrismaClient()
const routes = async (app) => {
    const tags = ["Films"];
	/**
	 * CREATE ONE FILMS
	 */
    // schema: {
    //     description: 'post some data',
    //     tags: ['user', 'code'],
    //     summary: 'qwerty',
    //     params: {
    //       type: 'object',
    //       properties: {
    //         id: {
    //           type: 'string',
    //           description: 'user id'
    //         }
    //       }
    //     },
    //     body: {
    //       type: 'object',
    //       properties: {
    //         hello: { type: 'string' },
    //         obj: {
    //           type: 'object',
    //           properties: {
    //             some: { type: 'string' }
    //           }
    //         }
    //       }
    //     },
    //     response: {
    //       201: {
    //         description: 'Successful response',
    //         type: 'object',
    //         properties: {
    //           hello: { type: 'string' }
    //         }
    //       },
    //       default: {
    //         description: 'Default response',
    //         type: 'object',
    //         properties: {
    //           foo: { type: 'string' }
    //         }
    //       }
    //     },
    //     security: [
    //       {
    //         "apiKey": []
    //       }
    //     ]
    //   }
    // }, (req, reply) => {})

	app.post("/films", {
            schema: {
                description: 'post some data',
                tags: tags,
                summary: 'Create a new film',
            }
        },async (request, reply) => {
            const {title, description, year} = request.body

            const film = await prisma.film.create({
                data: {
                    title,
                    description,
                    year,
                },
            })
		reply.send(film)
	})

	/**
	 * GET ALL FILMS
	 */
	app.get("/films", async (request, reply) => {
		// const films = await prisma.film.findMany()

		// reply.send(films)
	})

	/**
	 * GET ONE FILMS BY ID
	 */
	// app.get("/films/:id", async (request, reply) => {
	// 	const {id} = request.params

	// 	const films = await prisma.people.findUnique({
	// 		where: {
	// 			id: Number(id),
	// 		},
	// 	})

	// 	reply.send(films)
	// })

	/**
	 * UPDATE ONE FILMS
	 */
	// app.put("/films/:id", async (request, reply) => {
	// 	const {id} = request.params
	// 	const {name, email} = request.body

	// 	const film = await prisma.film.update({
	// 		where: {
	// 			id: Number(id),
	// 		},
	// 		data: {
	// 			name,
	// 			email,
	// 		},
	// 	})

	// 	reply.send(film)
	// })

	/**
	 * DELETE ONE FILMS
	 */
	// app.delete("/films/:id", async (request, reply) => {
	// 	const {id} = request.params

	// 	const film = await prisma.film.delete({
	// 		where: {
	// 			id: Number(id),
	// 		},
	// 	})

	// 	reply.send(film)
	// })
}


module.exports = {
    routes : routes
}