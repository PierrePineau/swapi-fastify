const configSwagger = {
    openapi: {
        // swagger: "3.0",
        // openapi: '3.0.0',
        routePrefix: "/doc",
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
    }
}

module.exports = configSwagger

