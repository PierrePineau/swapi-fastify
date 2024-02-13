const {People} = require("../models/index.js")

const routes = async (app) => {
	const tags = ["People"]
	/**
	 * GET People
	 */
	app.get(
		"/people",
		{
			schema: {
				description: "Get People",
				tags: tags,
				summary: "Get all people",
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
                            default: "DESC",
                            enum: ["ASC", "DESC"],
                        },
                    },
				},
				response: {
					200: {
						description: "Successful response",
                        type: "object",
                        properties: {
                            count: { 
                                type: "number" 
                            },
                            page: { 
                                type: "number" 
                            },
                            limit: {
                                type: "number" 
                            },
                            data: { 
                                type: "array",
                            }
                        },
					},
				},
			},
            onRequest: [app.authenticate]
		},
		async (request, reply) => {
            const page =  request.params.page || 1;
            const limit = request.params.limit || 10;
            const order = request.params.order == "ASC" ? "asc" : "desc";

            const peoples = await People.find().limit(10)

            peoples.forEach(people => {
                console.log(people);
            });

			return reply.send({
                count: peoples.length,
                page : page,
                limit : limit,
                data: peoples
            })
		}
	)

    // GET ONE BY ID
    app.get(
        "/people/:id",
        {
            schema: {
                description: "Get People by ID",
                tags: tags,
                summary: "Get People by ID",
                response: {
                    200: {
                        description: "Successful response",
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            },
                            data: {
                                type: "object",
                            }
                        },
                    },
                    404: {
                        description: "Person not found",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const id = request.params.id

            const people = await People.findById(id).exec()

            console.log(people);

            // const data = Object.entries(people)

            return reply.send({
                message: "Lorem",
                data: people
            })
        }
    )
}

module.exports = {
	routes: routes,
}