import mongoose from "mongoose"

mongoose.connect("mongodb+srv://diego:123@alura.rygqjjq.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;