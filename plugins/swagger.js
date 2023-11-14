const configSwagger = {
    openapi: {
        info: {
            title: "APISwapi",
            description: "API REST swapi with fastify",
            version: "1.0.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        schemes: ["http"],
        // consumes: ["application/json"],
        // produces: ["application/json"],
        components: {
            securitySchemes: {
                JWT: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JW",
                }
            }
        },
        tags: [
            {
                name: "Films",
                description: "Films API",
            },
            {
                name: "People",
                description: "People API",
            },
        ],
        exposeRoute: true,
    }
}

module.exports = configSwagger

