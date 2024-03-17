import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Event Management API Docs",
      version: " 1.0.0",
      description:
        "This is the api doc for the Ecommerce application- Task given by the Amnil in node intern",
    },
    components: {
      securitySchemes: {
        AdminKeyAuth: {
          type: "http",
          name: "Authorization",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        UserKeyAuth: {
          type: "http",
          name: "Authorization",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // security: [
    //   {
    //     AdminKeyAuth: [],
    //     UserKeyAuth: [],
    //   },
    // ],
    tags: [
      {
        name: "User",
        description: "Everything about Users",
      },
      {
        name: "Event",
        description: "Everything about events",
      },
    ],
  },
  apis: ["../app.ts", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
