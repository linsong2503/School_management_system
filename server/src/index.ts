import dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

// Route imports
import teacherRoute from "./routes/teacherRoute";




// Routes
app.get("/",(req,res)=>{
    res.send("This is home route");
})
app.use("/teachers",teacherRoute);
/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on part ${port}`);
});