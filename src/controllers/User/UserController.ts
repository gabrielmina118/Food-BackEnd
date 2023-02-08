import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import User from "../../model/User";
import { userDb } from "../../modelDB/User";
import { HashManager } from "../../service/HashManager";
import { ICreateUser } from "./Interfaces/ICreateUser";

class UserController {
  public static async createUser(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body;

    const userInput: ICreateUser = {
      name,
      email,
      cpf,
      password,
    };

    Object.keys(req.body).forEach(function (value) {
      if (!req.body[value]) {
        throw new BaseError(`The proprety '${value}' is missing`, 404);
      }
    });

    const hashPassword = await HashManager.HashCreate(userInput.password);

    const user = new User(
      userInput.name,
      userInput.email,
      userInput.cpf,
      hashPassword
    );

    // cria o modelo do mongo
    let userMongoDB = new userDb(user);

    const outPutDTO = {
      id: userMongoDB._id,
      name: userMongoDB.name,
      email: userMongoDB.email,
      cpf: userMongoDB.cpf
    }

    userMongoDB.save((err: any) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(201).send({
          message: "Usuário cadastrado com sucesso",
          user: outPutDTO,
        });
      }
    });
    
  }
}
export default UserController;
