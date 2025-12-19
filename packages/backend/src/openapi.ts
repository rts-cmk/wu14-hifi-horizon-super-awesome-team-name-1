export const openApiSpec = {
    openapi: '3.0.0',
    info: {
        title: 'hifi horizon api',
        version: '1.0.0',
        description: 'an api for hifi horizon'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'api for hifi horizon'
        }
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token'
            }
        }
    },
    paths: {
        '/register': {
            post: {
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['fullName', 'email', 'password', 'address', 'zipCode', 'city'],
                                properties: {
                                    fullName: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                    address: { type: 'string' },
                                    address2: { type: 'string' },
                                    zipCode: { type: 'string' },
                                    city: { type: 'string' },
                                    country: { type: 'string' },
                                    phone: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: { 201: { description: 'ok' } }
            }
        },
        '/login': {
            post: {
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: { 200: { description: 'ok' } }
            }
        },
        '/logout': {
            post: {
                tags: ['Auth'],
                security: [{ cookieAuth: [] }],
                responses: { 200: { description: 'ok' } }
            }
        },
        '/me': {
            get: {
                tags: ['Auth'],
                security: [{ cookieAuth: [] }],
                responses: { 200: { description: 'ok' } }
            },
            patch: {
                tags: ['Auth'],
                security: [{ cookieAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    fullName: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                    confirmPassword: { type: 'string' },
                                    address: { type: 'string' },
                                    address2: { type: 'string' },
                                    zipCode: { type: 'string' },
                                    city: { type: 'string' },
                                    country: { type: 'string' },
                                    phone: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: { 200: { description: 'ok' } }
            }
        }
    }
}
