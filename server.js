import express from "express";
import userRoute from "./router/users.routes.js";
import adminRouter from "./router/admin.routes.js";
const app = express();
app.use("/", userRoute);
app.use("/user", userRoute);
app.use("/admin", adminRouter);
app.listen(5000, console.log("listening on http://localhost: " + 5000));