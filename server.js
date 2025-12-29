const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://mukhammadiev1:bn2xxeyiQ16lEqVu@cluster0.cb1bnov.mongodb.net/reja?retryWrites=true&w=majority";

console.log("Trying to connect to MongoDB...");
mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
