// console.log(absolutePath);
// const path = require('path')
// const absolutePath = path.resolve(__dirname, '../routes')
const configSwaggerUI = {
    // mode : 'static',
    // specification: {
    //     path: "./openapi.json",
    //     postProcessor: function (swaggerObject) {
    //         return swaggerObject
    //     },
    //     baseDir: absolutePath,
    // },
	routePrefix: "/doc",
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject
    },
    transformSpecificationClone: true,
    // include: ['routes/*.js']
}

module.exports = configSwaggerUI

