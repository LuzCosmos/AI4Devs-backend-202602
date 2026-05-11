import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LTI API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts', './src/presentation/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

