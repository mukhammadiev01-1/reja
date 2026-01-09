// HTTP server yaratish uchun Node.js moduli
const http = require("http");

// MongoDB bilan ishlash uchun modul
const mongodb = require("mongodb");

// Ma'lumotlar bazasi uchun o‘zgaruvchi (keyinroq ishlatilishi mumkin)
let db;

// MongoDB Atlas ulanish stringi (REJA nomli database)
const connectionString =
  "mongodb+srv://mukhammadiev1:a7Mw1ucoMl3epqkW@cluster0.cb1bnov.mongodb.net/REJA?retryWrites=true&w=majority";

console.log("Trying to connect to MongoDB..."); // MongoDB ga ulanish boshlanyapti

// MongoDB ga ulanish
mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true, // Yangi URL parser
    useUnifiedTopology: true, // Yangi connection mexanizmi
  },
  (err, client) => {
    if (err) {
      // Agar MongoDB ga ulanmasa
      console.log("ERROR on connection MongoDB");
    } else {
      // MongoDB muvaffaqiyatli ulandi
      console.log("MongoDB connection succeed");

      // MongoDB client ni boshqa fayllar ishlata olishi uchun export qilamiz
      module.exports = client;

      // Express ilovasini chaqiramiz
      const app = require("./app");

      // HTTP server yaratamiz va express app ni bog‘laymiz
      const server = http.createServer(app);

      // Server ishlaydigan port
      let PORT = 4012;

      // Serverni ishga tushiramiz
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
