import  {Express} from "express"
import { adressRouter } from "./adressRouter"
import { userRouter } from "./userRouter"

const routes = (app:Express) =>{
    app.use(userRouter,adressRouter)
}
export default routes