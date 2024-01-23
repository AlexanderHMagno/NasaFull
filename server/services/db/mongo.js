const mongodb = require("mongoose");

class Database {
  static dataConnnection = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@sandbox.jjfwv.mongodb.net/nasa?retryWrites=true&w=majority`;
  static async start() {
    await mongodb
      .connect(this.dataConnnection)
      .then(() => {
        console.log("Mongo has been connected");
      })
      .catch((err) =>
        console.error(`There is an error when conection to mongo ${err}`)
      );
  }

  static async disconnect() {
    await mongodb.disconnect();
  }
}

module.exports = Database;
