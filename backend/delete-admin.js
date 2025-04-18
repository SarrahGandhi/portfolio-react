const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Admin Schema - must match what's in server.js
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("admins", adminSchema);

async function deleteAdmins() {
  const dburl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority&appname=Cluster0`;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB successfully!");

    // Count admins before deletion
    const adminCountBefore = await Admin.countDocuments();
    console.log(`Number of admins before deletion: ${adminCountBefore}`);

    // Delete all admins
    const result = await Admin.deleteMany({});
    console.log(`Deleted ${result.deletedCount} admin accounts`);

    // Verify deletion
    const adminCountAfter = await Admin.countDocuments();
    console.log(`Number of admins after deletion: ${adminCountAfter}`);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

deleteAdmins();
