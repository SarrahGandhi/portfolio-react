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

async function checkAdmins() {
  const dburl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority&appname=Cluster0`;

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB successfully!");

    // Count admins
    const adminCount = await Admin.countDocuments();
    console.log(`Number of admins in database: ${adminCount}`);

    // List all admins
    if (adminCount > 0) {
      const admins = await Admin.find({}, { password: 0 }); // Exclude password field
      console.log("Admin accounts:");
      admins.forEach((admin) => {
        console.log(
          `- Username: ${admin.username}, Created: ${admin.createdAt}`
        );
      });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

checkAdmins();
