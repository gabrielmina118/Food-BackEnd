import express , {Express} from "express"
import { userRouter } from "./userRouter"

const routes = (app:Express) =>{
    app.use(userRouter)
}
export default routes