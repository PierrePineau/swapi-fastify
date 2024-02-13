const {Film} = require("../models/index.js")
const mongooseToSwagger = require("mongoose-to-swagger")

const routes = async (app) => {
	const tags = ["Films"];
    const Collection = mongooseToSwagger(Film);

    const EntityProperties = {};
    const EntityPropertiesCreate = {};
    const EntityPropertiesUpdate = {};
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
            EntityPropertiesUpdate[key] = value;
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
            try {
                const body = request.body
                const film = new Film(body)
                await film.save()
                return reply.send(film)
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
			
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
            try {
                const id = request.params.id

                const film = await Film.findOne(
                    {
                        _id: id
                    }
                )
                return reply.send(film)
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
		}
	)

	/**
	 * UPDATE ONE FILM
	 */
	app.put(
        "/films/:id",
        {
            schema: {
                description: "Update one film",
                tags: tags,
                summary: "Update one film",
                body: {
                    type: "object",
                    properties: EntityPropertiesUpdate,
                },
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
            try {
                const id = request.params.id

                const film = await Film.findOneById(
                    {
                        _id: id
                    },
                )

                // On vérifie si le film existe
                if (!film) {
                    return reply.status(404).send({
                        message: "Not found"
                    })
                }

                // On met à jour
                await film.save();

                return reply.send(film);
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
		}
	)

	/**
	 * DELETE ONE FILMS
	 */
	app.delete(
        "/films/:id",
        {
            schema: {
                description: "Update one film",
                tags: tags,
                summary: "Update one film",
                body: {
                    type: "object",
                    properties: EntityPropertiesUpdate,
                },
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
            const {id} = request.params

            const film = await Film.findOne(
                {
                    _id: id
                }
            )

            if (!film) {
                return reply.status(404).send({
                    message: "Not found"
                })
            }else{
                await film.remove();
                return reply.send(film);
            }
        })
}

module.exports = {
	routes: routes,
}
