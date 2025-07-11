"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// Configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Route imports
const teacherRoute_1 = __importDefault(require("./routes/teacherRoute"));
// Routes
app.get("/", (req, res) => {
    res.send("This is home route");
});
app.use("/teachers", teacherRoute_1.default);
/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on part ${port}`);
});
