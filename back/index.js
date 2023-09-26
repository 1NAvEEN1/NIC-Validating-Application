const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const Users = require("./routes/Users");
app.use("/Users", Users);

const Mobi_Validations = require("./routes/Mobi_Validations");
app.use("/Mobi_Validations", Mobi_Validations);

const NIC_Validations = require("./routes/NIC_Validations");
app.use("/NIC_Validations", NIC_Validations);

const Analytics = require("./routes/Analytics");
app.use("/Analytics", Analytics);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running");
  });
});
