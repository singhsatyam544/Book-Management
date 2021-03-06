// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const  mongoose  = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==+==+==+==+==+==+==+==+==+==[Connect DataBase]==+==+==+==+==+==+==+==+==+==
mongoose
  .connect("mongodb+srv://singhsatyam544:test@cluster0.s2bskcq.mongodb.net/group65database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected "))
  .catch((err) => console.log(err.message));

  
app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app is running on port " + (process.env.PORT || 3000));
});


