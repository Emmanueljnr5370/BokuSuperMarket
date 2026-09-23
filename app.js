const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const express = require("express");
const connectDB = require("./Config/databaseConfig");
const productRoute = require("./Routes/ProductRoute");

const app = express();

connectDB(); // Connect to MongoDB

app.use(express.json()); //middleware to parse JSON request bodies


app.use("/products", productRoute); // use the product route for all requests starting with /products
//app.use('/users', require('./Routes/UserRoute')); //Use the user route for all requests starting with /users


app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
