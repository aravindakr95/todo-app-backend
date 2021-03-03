import swaggerJsdoc from 'swagger-jsdoc';

async function swaggerSpecification() {
  const options = {
    definition: {
      info: {
        title: 'API Documentation',
        description: 'API Documentation for Todo Application',
        version: '1.0.0',
        apis: './src/routes*.js', // files containing annotations as above,
      },
    },
  };

  return swaggerJsdoc(options);
}

export default swaggerSpecification;
