"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AppRouter_1 = require("./AppRouter");
const pool_1 = __importDefault(require("./config/pool"));
const config_1 = require("./config");
require("./controllers/ProductController");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(AppRouter_1.AppRouter.getInstance());
pool_1.default.connect(err => {
    if (err)
        throw new Error('Error while connecting to database');
    console.log('Connected to database');
    app.listen(config_1.port, () => {
        console.log(`Server running on port : ${config_1.port}`);
    });
});
