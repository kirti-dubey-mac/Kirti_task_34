require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port " + (process.env.PORT || 5000))
    );
  })
  .catch((err) => console.error("DB error:", err.message));