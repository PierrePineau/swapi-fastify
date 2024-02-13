const fastify = require("fastify")()

const configSwagger = require("./plugins/swagger.js")
const configSwaggerUI = require("./plugins/swagger-ui.js")
const mongoose = require("mongoose")
const {Film} = require("./mongoose/model.js")
const path = require("path")

// const films = require("./routes/films.js");
// const people = require("./routes/people.js");
// const sequelizeFastify = require("sequelize-fastify")

const start = async () => {
	try {

        

		// Enregistre le plugin fastify-swagger
		await fastify.register(require("@fastify/swagger"), configSwagger)

		// Enregistre le plugin fastify-swagger-ui
		await fastify.register(require("@fastify/swagger-ui"), configSwaggerUI)

		// fastify.register(require("@fastify/autoload"), {
		//     dir: path.join(__dirname, "/routes/"),
		// });
		// console.log(path.join(__dirname, "/routes"));

		// Les routes des films
		// films.routes(fastify);

		// Les routes des People
		// people.routes(fastify);

		fastify.get(
			"/films",
			{
				schema: {
					description: "Get Films",
					tags: ["Films"],
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
									// example:
								},
							},
							// $ref: "#/components/responses/List",
						},
					},
				},
				// onRequest: [app.authenticate]
			},
			async (request, reply) => {
				// const {page, limit, order} = request.params
				const page = request.params.page || 1;
				const limit = request.params.limit || 10;
				const order = request.params.order == "ASC" ? "asc" : "desc";

				const films = await Film.find().limit(10);

				films.forEach((film) => {
					console.log(film)
				})
				// console.log(films);

				return reply.send({
					count: films.length,
					page: page,
					limit: limit,
					data: films,
				})
			}
		)

		// fastify.post(`/signup`, async (req, res) => {
		//   const { name, email, posts } = req.body;

		//   const postData = posts
		//     ? posts.map((post) => {
		//         return { title: post.title, content: post.content || undefined };
		//       })
		//     : [];

		//   const result = await prisma.user.create({
		//     data: {
		//       name,
		//       email,
		//       posts: {
		//         create: postData,
		//       },
		//     },
		//   });
		//   return result;
		// });

		fastify.post(`/post`, async (req, res) => {
			const {title, content, authorEmail} = req.body
			const result = await prisma.post.create({
				data: {
					title,
					content,
					author: {connect: {email: authorEmail}},
				},
			})
			return result
		})

		// fastify.put("/post/:id/views", async (req, res) => {
		//   const { id } = req.params;

		//   try {
		//     const post = await prisma.post.update({
		//       where: { id: Number(id) },
		//       data: {
		//         viewCount: {
		//           increment: 1,
		//         },
		//       },
		//     });

		//     return post;
		//   } catch (error) {
		//     return { error: `Post with ID ${id} does not exist in the database` };
		//   }
		// });

		fastify.put("/publish/:id", async (req, res) => {
			const {id} = req.params

			try {
				const postData = await prisma.post.findUnique({
					where: {id: Number(id)},
					select: {
						published: true,
					},
				})

				const updatedPost = await prisma.post.update({
					where: {id: Number(id) || undefined},
					data: {published: !postData.published || undefined},
				})
				return updatedPost
			} catch (error) {
				return {error: `Post with ID ${id} does not exist in the database`}
			}
		})

		fastify.delete(`/post/:id`, async (req, res) => {
			const {id} = req.params

			const post = await prisma.post.delete({
				where: {
					id: Number(id),
				},
			})
			return post
		})

		fastify.get("/users", async (req, res) => {
			const users = await prisma.user.findMany()
			return users
		})

		fastify.get("/user/:id/drafts", async (req, res) => {
			const {id} = req.params

			const drafts = await prisma.user
				.findUnique({
					where: {
						id: Number(id),
					},
				})
				.posts({
					where: {published: false},
				})

			return drafts
		})

		fastify.get(`/post/:id`, async (req, res) => {
			const {id} = req.params

			const post = await prisma.post.findUnique({
				where: {id: Number(id)},
			})
			return post
		})

		fastify.get("/feed", async (req, res) => {
			const {searchString, skip, take, orderBy} = req.query

			const or = searchString
				? {
						OR: [{title: {contains: searchString}}, {content: {contains: searchString}}],
				  }
				: {}

			const posts = await prisma.post.findMany({
				where: {
					published: true,
					...or,
				},
				include: {author: true},
				take: Number(take) || undefined,
				skip: Number(skip) || undefined,
				orderBy: {
					updatedAt: orderBy || undefined,
				},
			})

			return posts
		})

		// Attend que Fastify soit prêt
		// await fastify.ready()
		// fastify.swagger()
		// On récupère dans le .env les informations de connexion à la base de données
		// console.log(process.env.DATABASE_URL);
		// const PORT = 3001 || 16743;

        const DATABASE_URL = "mongodb+srv://LeoTeix:1234@cluster0.rolrany.mongodb.net/swapi?retryWrites=true&w=majority"
        mongoose
            .connect(DATABASE_URL, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            })
            .then(
                async () => {
                    await fastify.listen({port: 3000})
                    console.log(`Serveur lancé sur http://localhost:${fastify.server.address().port}/doc`)
                }
                // fastify.listen(, () =>
                //   console.log(`Server: http://localhost:${PORT}}`)
                // )
            )
            .catch((error) => console.log(`${error} did not connect`))

		// await fastify
		// 	.register(sequelizeFastify, {
		// 		instance: "db",
		// 		sequelizeOptions: {
		// 			dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
		// 			database: process.env.DATABASE_NAME,
		// 			username: process.env.DATABASE_USER_NAME,
		// 			password: process.env.DATABASE_USER_PASSWORD,
		// 			host: process.env.DATABASE_HOST_OR_SERVER,
		// 			port: process.env.DATABASE_PORT,
		// 		},
		// 	})
		// 	.ready(async () => {
		// 		try {
		// 			// first connection
		// 			const result = await fastify.db.authenticate()

		// 			await fastify.listen({port: 3000})
		// 			console.log(`Serveur lancé sur http://localhost:${fastify.server.address().port}/doc`)

		// 			console.log(chalk.green("Database connection is successfully established."))
		// 		} catch (err) {
		// 			console.log(chalk.red(`Connection could not established: ${err}`))
		// 			process.exit(1)
		// 		}
		// 		// } finally {
		// 		//     fastify.close()
		// 		// }
		// 	})
		// 	// Lance le serveur Fastify
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

// Appelle la fonction principale
start()
