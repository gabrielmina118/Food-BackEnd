import { Request, Response } from "express";
import BaseError from "../../error/BaseError";
import { ICreateUser } from "./Interfaces/ICreateUser";

class UserController {
  public static createUser(req: Request, res: Response) {
    const { name, email, cpf, password } = req.body;

    const user:ICreateUser = {
      name,
      email,
      cpf,
      password
    }

    Object.keys(user).forEach(function(value){
        if(!user[value]){
          console.log("value",value);
      
            throw new BaseError(`The proprety '${value}' is missing`,404)
        }
        
    })

  }
}
export default UserController;
