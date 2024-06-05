import mongoose from "mongoose";

export const connect = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "linguifyai",
    })
    .then(() => {
      console.log("connected to DB successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
