import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.connect(process.env.DB_MONGO_CONFIG!);

export let connectionDB = mongoose.connection;
