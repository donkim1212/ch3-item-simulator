import mongoose from "mongoose";
import dotenv from "dotenv/config";

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@ch3-item-simulator.crhewk7.mongodb.net/admin?retryWrites=true&loadBalanced=false&replicaSet=atlas-d9ek6t-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&w=majority&authSource=admin&authMechanism=SCRAM-SHA-1`,
      {
        dbName: "ch3-item-simulator"
      }
    )
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log("DB connected.");
    });
};

export default connect;