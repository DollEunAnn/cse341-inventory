const swaggerAutogen = require("swagger-autogen")();

const isProd = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "Inventory API",
    description: "API documentation",
    version: "1.0.0",
  },
  host: isProd
    ? "cse341-inventory-zj9v.onrender.com"
    : "localhost:3000",
  schemes: isProd ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);