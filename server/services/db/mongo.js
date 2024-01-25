const mongodb = require("mongoose");

class Database {
  static _database;
  constructor() {
    Database._start();
  }

  static async _start() {
    await mongodb
      .connect(process.env.MONGOURL)
      .then(() => {
        console.log("Mongo has been connected");
      })
      .catch((err) =>
        console.error(`There is an error when conection to mongo ${err}`)
      );
  }

  static getInstance() {
    if (!this._database) {
      this._database = new Database();
    }
    return this._database;
  }

  static async disconnect() {
    await mongodb.disconnect();
  }
}

module.exports = Database;
