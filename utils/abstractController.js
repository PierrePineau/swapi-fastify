const mongooseToSwagger = require('mongoose-to-swagger');

class AbstractController {
    constructor(fastify, model, tags, path, plural, singular) {
        this.fastify = fastify;
        this.model = model;
        this.path = path;
        this.tags = tags;
        this.singular = singular;
        this.plural = plural;
        this.collection = mongooseToSwagger(model);
        this.entityProperties = {};
        this.entityPropertiesCreate = {};
        this.entityPropertiesUpdate = {};

        this.init();
        this.initRoutes();
    }
    init = () => {
        Object.entries(this.collection.properties).forEach(([key, value]) => {
            if (value.type === 'array' && value.items && value.items.type === 'schemaobjectid') {
                value.items = {
                    type: 'array',
                    items: {
                        type: 'integer'
                    }
                }
            }
            // On push sur la collection properties
            this.entityProperties[key] = value;
            if (key !== '_id') {
                this.entityPropertiesCreate[key] = value;
                this.entityPropertiesUpdate[key] = value;
            }
        });

    }

    initRoutes = () => {
        // GET ALL
        this.fastify.get(
            `/${this.path}`,
            {
                schema: {
                    description: `Get ${this.plural}`,
                    tags: this.tags,
                    summary:  `Get ${this.plural}`,
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
                return this.getAll(request, reply)
            }
        )

        // GET ONE
        this.fastify.get(
            `/${this.path}/:id`,
            {
                schema: {
                    tags: this.tags,
                    summary: `Get one ${this.singular}`,	
                    response: {
                        200: {
                            response: 200,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                    },
                }
            },
            async (request, reply) => {
                return this.getOne(request, reply)
            }
        )

        // CREATE ONE
        this.fastify.post(
            `/${this.path}`,
            {
                schema: {
                    summary: `Create new ${this.singular}`,
                    tags: this.tags,
                    body: {
                        type: "object",
                        properties: this.entityPropertiesCreate,
                    },
                    response: {
                        200: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            async (request, reply) => {
                return this.create(request, reply)
            }
        )

        // UPDATE ONE
        this.fastify.put(
            `/${this.path}/:id`,
            {
                schema: {
                    tags: this.tags,
                    summary: `Update one ${this.singular}`,
                    body: {
                        type: "object",
                        properties: this.entityPropertiesUpdate,
                    },
                    response: {
                        200: {
                            response: 200,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                    },
                }
            },
            async (request, reply) => {
                return this.update(request, reply)
            }
        )

        // DELETE ONE
        this.fastify.delete(
            `/${this.path}/:id`,
            {
                schema: {
                    tags: this.tags,
                    summary: `Delete one ${this.singular}`,
                    body: {
                        type: "object",
                        properties: this.entityPropertiesUpdate,
                    },
                    response: {
                        200: {
                            response: 200,
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                    },
                }
            },
            async (request, reply) => {
                return this.delete(request, reply)
            }
        )
    }

    getAll = async (request, reply) => 
    {
        try {
            const page = request.params.page || 1
            const limit = request.params.limit || 10
            const order = request.params.order == "ASC" ? "asc" : "desc"

            const total = await this.model.find().countDocuments()

            const elements = await this.model.find().limit(limit).skip((page - 1) * limit).sort({title: order})

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

    getOne = async (request, reply) => {
        try {
            const id = request.params.id

            const element = await this.model.findOne(
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

    create = async (request, reply) => {
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

    update = async (request, reply) => {
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

    delete = async (request, reply) => {
        try {
            const id = request.params.id

            const element = await this.model.findOneById(
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

            // On supprime
            await element.delete();

            return reply.send(element);
        } catch (error) {
            return reply.status(400).send({
                message: error.message
            })
        }
    }
}

module.exports = AbstractController;