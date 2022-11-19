import express from "express";

const app = express();

// middleware
app.use(express.json()); // convert req.body to json

const port = env.port || 3000;

app.get("/ping", (req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});

app.listen(port, () => {
  console.log("server on port " + port);
});
