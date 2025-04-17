const mongoose = require("mongoose");
const dburl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority&appname=Cluster0`;
async function connectDB() {
  await mongoose.connect(dburl);
}
module.exports = { connectDB };
