"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../../error/BaseError"));
const User_1 = __importDefault(require("../../model/User"));
const User_2 = require("../../modelDB/User");
const Authenticator_1 = __importDefault(require("../../service/Authenticator"));
const HashManager_1 = require("../../service/HashManager");
class UserController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                Object.keys(req.body).forEach(function (value) {
                    if (!req.body[value]) {
                        throw new BaseError_1.default(`The proprety '${value}' is missing`, 404);
                    }
                });
                const [emailAlreadExist] = yield User_2.userDb.find({ email });
                if (!emailAlreadExist) {
                    throw new BaseError_1.default(`Email ${email} não cadastrado`, 404);
                }
                const verifyPassword = yield HashManager_1.HashManager.comparePassword(password, emailAlreadExist.password);
                if (!verifyPassword) {
                    throw new BaseError_1.default(`senha incorreta`, 401);
                }
                const outPutDTO = {
                    id: emailAlreadExist._id,
                    name: emailAlreadExist.name,
                    email: emailAlreadExist.email,
                    cpf: emailAlreadExist.cpf,
                    hasAdress: emailAlreadExist.hasAdress,
                };
                const token = Authenticator_1.default.generateToken(emailAlreadExist._id.toString());
                res.status(200).send({ user: outPutDTO, token });
            }
            catch (error) {
                if (error instanceof BaseError_1.default) {
                    res.status(error.statusCode).send({ message: error.message });
                }
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, cpf, password } = req.body;
            const userInput = {
                name,
                email,
                cpf,
                password,
            };
            Object.keys(req.body).forEach(function (value) {
                if (!req.body[value]) {
                    throw new BaseError_1.default(`The proprety '${value}' is missing`, 404);
                }
            });
            const hashPassword = yield HashManager_1.HashManager.HashCreate(userInput.password);
            const user = new User_1.default(userInput.name, userInput.email, userInput.cpf, hashPassword);
            let userMongoDB = new User_2.userDb(user);
            const outPutDTO = {
                id: userMongoDB._id,
                name: userMongoDB.name,
                email: userMongoDB.email,
                cpf: userMongoDB.cpf,
                hasAdress: userMongoDB.hasAdress,
            };
            userMongoDB.save((err) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(201).send({
                        message: "successfully registered user",
                        user: outPutDTO,
                    });
                }
            });
        });
    }
}
exports.default = UserController;
