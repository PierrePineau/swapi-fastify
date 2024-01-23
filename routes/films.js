const routes = async (app) => {
	const tags = ["Films"]
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
                            default: "DESC",
                            enum: ["ASC", "DESC"],
                        },
                    },
					// $ref: "#/components/parameters/List",
					// required: ['id']
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
                                // example:
                            }
                        },
                        // $ref: "#/components/responses/List",
					},
				},
			},
            // onRequest: [app.authenticate]
		},
		async (request, reply) => {
			// const {page, limit, order} = request.params
            const page =  request.params.page || 1;
            const limit = request.params.limit || 10;
            const order = request.params.order == "ASC" ? "asc" : "desc";

            // const repoFilms = app.mongo.db.collection('Films');

            const films = await prisma.films.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy : {
                    edited: order
                },
                select : {
                    producer: true,
                }
            })

            // const films = await repoFilms.find().limit(10)
                       

            films.forEach(film => {
                console.log(film);
            });
            // console.log(films);

			return reply.send({
                count: films.length,
                page : page,
                limit : limit,
                data: films
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
				description: "Create a new film",
				tags: tags,
				summary: "Create a new film",
				body: {
					type: "object",
					properties: {
						title: {type: "string"},
						producer: {type: "string"}
					},
				},
			},
		},
		async (request, reply) => {
			const {title, producer, year } = request.body

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
                        // $ref: "#/components/responses/List",
					},
				},
			},
		},
		async (request, reply) => {
			const id = request.params.id

            const film = await prisma.people.findUnique({
                where: {
                    id: Number(id),
                },
            })
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