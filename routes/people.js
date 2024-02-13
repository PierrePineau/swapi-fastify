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
		},
		async (request, reply) => {
            const page =  request.params.page || 1;
            const limit = request.params.limit || 10;
            const order = request.params.order == "ASC" ? "asc" : "desc";

            const people = await People.find().limit(10)

            people.forEach(people => {
                console.log(people);
            });

			return reply.send({
                count: people.length,
                page : page,
                limit : limit,
                data: people
            })
		}
	)

    // GET ONE PEA
    app.get(

    )


}

module.exports = {
	routes: routes,
}