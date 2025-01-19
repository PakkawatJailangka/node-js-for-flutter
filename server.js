const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRoutes = require("./routes/items.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, Node.js server is running!");
});
app.use("/api", itemsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
