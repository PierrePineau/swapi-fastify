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
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                total: {
                                    type: "number",
                                },
                                data: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                        204: {
                            description: "No content",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        400: {
                            description: "Bad request",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        403: {
                            description: "Forbidden",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        404: {
                            description: "Not found",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        429: {
                            description: "Too many requests",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        502: {
                            description: "Bad gateway",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        503: {
                            description: "Service unavailable",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
                onRequest: [this.fastify.authenticate],
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
                        204: {
                            description: "No content",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        400: {
                            description: "Bad request",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        403: {
                            description: "Forbidden",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        404: {
                            description: "Not found",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        429: {
                            description: "Too many requests",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        502: {
                            description: "Bad gateway",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        503: {
                            description: "Service unavailable",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
                onRequest: [this.fastify.authenticate],
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
                        201: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: this.entityProperties,
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Bad request",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        403: {
                            description: "Forbidden",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        404: {
                            description: "Not found",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        429: {
                            description: "Too many requests",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        502: {
                            description: "Bad gateway",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        503: {
                            description: "Service unavailable",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
                onRequest: [this.fastify.authenticate],
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
                        204: {
                            description: "No content",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        400: {
                            description: "Bad request",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        403: {
                            description: "Forbidden",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        404: {
                            description: "Not found",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        429: {
                            description: "Too many requests",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        502: {
                            description: "Bad gateway",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        503: {
                            description: "Service unavailable",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
                onRequest: [this.fastify.authenticate],
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
                    response: {
                        200: {
                            description: "Successful response",
                            type: "object",
                            properties: {
                                success: {
                                    type: "string",
                                },
                            },
                        },
                        204: {
                            description: "No content",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        400: {
                            description: "Bad request",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        403: {
                            description: "Forbidden",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        404: {
                            description: "Not found",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        429: {
                            description: "Too many requests",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        500: {
                            description: "Internal server error",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        502: {
                            description: "Bad gateway",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        503: {
                            description: "Service unavailable",
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                    },
                },
                
            },
            async (request, reply) => {
                return this.delete(request, reply)
            }
        )
    }

    getAll = async (request, reply) => 
    {
        try {
            const total = await this.model.find().countDocuments()

            const elements = await this.model.find()

            return reply.status(200).send({
                total: total,
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
            return reply.status(200).send(element)
        } catch (error) {
            return reply.status(400).send({
                message: error.message
            })
        }
    }

    create = async (request, reply) => {
        try {
            const body = request.body
            const element = await this.model.create(body)
            await element.save()
            return reply.status(201).send(element)
        } catch (error) {
            return reply.status(400).send({
                message: error.message
            })
        }
    }

    update = async (request, reply) => {
        try {
            const id = request.params.id

            const body = request.body

            // Utilisation de findByIdAndUpdate pour mettre à jour la planète
            const element = await this.model.findByIdAndUpdate(id, body, { new: true });

            // reply.send(element);

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

            const element = await this.model.findOne(
                {
                    _id: id
                }
            )

            // On vérifie si l'element existe
            if (!element) {
                return reply.status(404).send({
                    message: "Not found"
                })
            }

            // On supprime
            await this.model.deleteOne(
                {
                    _id: id
                }
            )

            return reply.send({success: "Element deleted"});
        } catch (error) {
            return reply.status(400).send({
                message: error.message
            })
        }
    }
}

module.exports = AbstractController;