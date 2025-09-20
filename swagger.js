const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Recipes API",
        description: "Recipes API"
    },
    host: "cse341-project2-u2ip.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);