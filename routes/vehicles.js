const {Vehicle} = require("../models/index.js")
const mongooseToSwagger = require("mongoose-to-swagger")

const routes = async (app) => {
    const path = "vehicles";
    const singular = "vehicle";
    const plural = "vehicles";

	const tags = ["Vehicles"];
    const Collection = mongooseToSwagger(Vehicle);

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
	 * GET ALL
	 */
	app.get(
		`/${path}`,
		{
            schema: {
                description: `Get ${plural}`,
                tags: tags,
                summary:  `Get ${plural}`,
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
            try {
                // const {page, limit, order} = request.params
                const page = request.params.page || 1
                const limit = request.params.limit || 10
                const order = request.params.order == "ASC" ? "asc" : "desc"

                const total = await Species.find().countDocuments()

                const elements = await Species.find().limit(limit).skip((page - 1) * limit).sort({title: order})

                return reply.send({
                    count: total,
                    page: page,
                    limit: limit,
                    data: elements,
                })
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
		}
	)

	/**
	 * CREATE ONE
	 */
	app.post(
		`/${path}`,
		{
            schema: {
                summary: `Create new ${singular}`,
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
                const element = new Species(body)
                await element.save()
                return reply.send(element)
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
			
		}
	)

	/**
	 * GET ONE
	 */
	app.get(
		`/${path}/:id`,
		{
            schema: {
                tags: tags,
                summary: `Get one ${singular}`,	
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

                const element = await Species.findOne(
                    {
                        _id: id
                    }
                )
                return reply.send(element)
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
		}
	)

	/**
	 * UPDATE ONE
	 */
	app.put(
        `/${path}/:id`,
        {
            schema: {
                tags: tags,
                summary: `Update one ${singular}`,
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

                const element = await Species.findOneById(
                    {
                        _id: id
                    },
                )

                // On vérifie si l'element existe
                if (!element) {
                    return reply.status(404).send({
                        message: "Not found"
                    })
                }

                // On met à jour
                await element.save();

                return reply.send(element);
            } catch (error) {
                return reply.status(400).send({
                    message: error.message
                })
            }
		}
	)

	/**
	 * DELETE ONE
	 */
	app.delete(
        `/${path}/:id`,
        {
            schema: {
                tags: tags,
                summary: `Delete one ${singular}`,
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

            const element = await Species.findOne(
                {
                    _id: id
                }
            )

            if (!element) {
                return reply.status(404).send({
                    message: "Not found"
                })
            }else{
                await element.remove();
                return reply.send(element);
            }
        })
}

module.exports = {
	routes: routes,
}
