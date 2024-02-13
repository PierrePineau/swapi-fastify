const {Film} = require("../models/index.js")
const mongooseToSwagger = require("mongoose-to-swagger")

const routes = async (app) => {
	const tags = ["Films"];
    const Collection = mongooseToSwagger(Film);

    const EntityProperties = {};
    const EntityPropertiesCreate = {};
    Object.entries(Collection.properties).forEach(([key, value]) => {
        if (value.type === 'array' && value.items && value.items.type === 'schemaobjectid') {
            value.items = {
                type: 'array',
                items: {
                    type: 'integer'
                }
            }
        }
        // On push sur la collection properties
        EntityProperties[key] = value;
        if (key !== '_id') {
            EntityPropertiesCreate[key] = value;
        }
    });

	/**
	 * GET FILMS
	 */
	app.get(
		"/films",
		{
            schema: {
                description: "Get Films",
                tags: tags,
                summary: "Get all films",
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
                            default: "ASC",
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
			// onRequest: [app.authenticate],
		},
		async (request, reply) => {
			// const {page, limit, order} = request.params
			const page = request.params.page || 1
			const limit = request.params.limit || 10
			const order = request.params.order == "ASC" ? "asc" : "desc"

            const totalFilms = await Film.find().countDocuments()

			const films = await Film.find().limit(limit).skip((page - 1) * limit).sort({title: order})

			return reply.send({
				count: totalFilms,
				page: page,
				limit: limit,
				data: films,
			})
		}
	)

	/**
	 * CREATE ONE FILM
	 */
	app.post(
		"/films",
		{
            schema: {
                summary: "Create a new film",
                description: "Create a new film",
                tags: tags,
                body: {
                    type: "object",
                    properties: EntityPropertiesCreate,
                },
                response: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: EntityProperties,
                                },
                            },
                        },
                    },
                },
            },
		},
		async (request, reply) => {
			const {title, producer, year} = request.body

			const film = await prisma.films.create({
				data: {
					title,
					producer,
					year,
				},
			})
			reply.send(film)
		}
	)

	/**
	 * GET ONE FILM BY ID
	 */
	app.get(
		"/films/:id",
		{
            schema: {
                description: "Get one film by id",
                tags: tags,
                summary: "Get one film by id",
                response: {
                    200: {
                        response: 200,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: EntityProperties,
                                },
                            },
                        },
                    },
                },
            }
		},
		async (request, reply) => {
			const id = request.params.id

			const film = await Film.findOne(
                {
                    _id: id
                }
            )
			reply.send(film)
		}
	)

	/**
	 * UPDATE ONE FILM
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
	routes: routes,
}
