"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter_1 = require("./userRouter");
const routes = (app) => {
    app.use(userRouter_1.userRouter);
};
exports.default = routes;
