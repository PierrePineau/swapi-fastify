const {User} = require("../models/index.js")


const routes = async (app) => {
	const tags = ["Auth"]

    app.register(require('fastify-bcrypt'), {
        saltWorkFactor: 12
    })
    /**
	 * SIGNUP
	 */
    app.post(
		"/signup",
		{
			schema: {
				summary: "Create new user",
				description: "Create new user",
				tags: tags,
                body: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            default: "user@gmail.com",
                        },
                        password: {
                            type: "string",
                            default: "password",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                email: {
                                                    type: "string",
                                                },
                                                token: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
			},
		},
		async (request, reply) => {
			const {email, password } = request.body

            // On vérifie si l'utilisateur existe
            const userAlreadyExist = await User.findOne({
                email: email
            });

            if(userAlreadyExist){
                reply.status(401).send({message: "User already exist"})
            }else{

                // On hash le mot de passe
                const passwordHashed = await app.bcrypt.hash(password)

                // On crée l'utilisateur
                const user = await User.create({
                    email: email,
                    password: passwordHashed,
                    roles: ["ROLE_USER"]
                })
                reply.send({
                    message: "User created",
                    data: {
                        email: user.email,
                        token: app.jwt.sign({email: user.email})
                    }
                })
            }
		}
	)
	/**
	 * SIGNIN
	 */
	app.post(
		"/signin",
		{
			schema: {
				description: "Authentification",
				tags: tags,
				// summary: "Create a new film",
				body: {
					type: "object",
					properties: {
						email: {
                            type: "string",
                            default: "user@gmail.com"
                        },
                        password: {
                            type: "string",
                            default: "password"
                        }
					},
				},
			},
		},
		async (request, reply) => {
			const {email, password } = request.body

            // On vérifie si l'utilisateur existe
            const user = await User.findOne({
                email: email
            })

            // Si l'utilisateur n'existe pas
            if(!user){
                reply.status(401).send({message: "Invalid credentials"})
            }else{

                // On vérifie le mot de passe
                const passwordMatch = await app.bcrypt.compare(password, user.password)

                // Si le mot de passe est bon
                if(passwordMatch){
                    reply.send({
                        message: "User authenticated",
                        data: {
                            email: user.email,
                            token: app.jwt.sign({email: user.email})
                        }
                    })
                }else{
                    reply.status(401).send({message: "Invalid credentials"})
                }
            }
		}
	)

    /**
     * Verify JWT
     */
    app.decorate("authenticate", async function(request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
}

module.exports = {
	routes: routes,
}