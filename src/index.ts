import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
