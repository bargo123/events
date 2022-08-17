require("dotenv").config();
require("express-async-errors")
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const connectDB = require("./db/connect");
const authroutes = require("./routes/auth-routes");
const eventRoutes = require("./routes/events_route");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const morgan = require("morgan")("tiny");


app.use(morgan);
app.use(express.json());
app.use("/api/v1/auth/", authroutes);
app.use("/api/v1/event/", eventRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

connectDB(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log("Listeneg to Port 3000");
    })

}).catch((error) => {
    console.log(`DB Error ${error}`);
})
