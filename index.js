const fastify = require("fastify")()

const configSwagger = require("./plugins/swagger.js")
const configSwaggerUI = require("./plugins/swagger-ui.js")
const mongoose = require("mongoose")
// const {Film, People, Planet, Species, Starship, Vehicle} = require("./models/index.js")
const path = require("path")
const Sentry = require('@sentry/node')
const { ProfilingIntegration } = require('@sentry/profiling-node');



const start = async () => {
	try {
		Sentry.init({
			dsn: "https://d42ab0e63ef38c8fbd61d767f03cfb29@o4506738861146112.ingest.sentry.io/4506738914885632",
			tracesSampleRate: 1.0,
  			profilesSampleRate: 1.0,
  			integrations: [
    		new ProfilingIntegration(),
  			],
		});

		fastify.addHook('onRequest', (request, reply, done) => {
			Sentry.Handlers.requestHandler()(request.raw, reply.raw, done);
		});

		fastify.addHook('onError', (request, reply, error, done) => {
			Sentry.captureException(error);
			done();
		});
		// Enregistre le plugin fastify-swagger
		await fastify.register(require("@fastify/swagger"), configSwagger)

		// Enregistre le plugin fastify-swagger-ui
		await fastify.register(require("@fastify/swagger-ui"), configSwaggerUI)

        // Enregistre JWT
        await fastify.register(require("@fastify/jwt"), {
            secret: "mysupersecretkey",
        })

        const auth = require("./routes/auth.js");
        const films = require("./routes/films.js");
        const people = require("./routes/people.js");
        // const planets = require("./routes/planets.js");
        const species = require("./routes/species.js");
        const starships = require("./routes/starships.js");
        const vehicles = require("./routes/vehicles.js");

		// fastify.register(require("@fastify/autoload"), {
		//     dir: path.join(__dirname, "/routes/"),
		// });
		// console.log(path.join(__dirname, "/routes"));

		// Authentification
		auth.routes(fastify);

		// Les routes des films
		// films.routes(fastify);

		//Les routes des planets
		planets.routes(fastify);

		// Les routes des People
		people.routes(fastify);

        // Les routes des Planets
        // planets.routes(fastify);

        // Les routes des Species
        species.routes(fastify);

        // Les routes des Starships
        starships.routes(fastify);

        // Les routes des Vehicles
        vehicles.routes(fastify);


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
			// Lance le serveur Fastify
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

// Appelle la fonction principale
start()
