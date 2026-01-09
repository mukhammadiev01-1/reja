console.log("Begin web server"); // Server ishga tushayotganini konsolga chiqaradi

// Express frameworkni chaqiramiz
const express = require("express");

// Response obyektini alohida olish (bu yerda amalda ishlatilmayapti)
const res = require("express/lib/response");

// Express ilovasini yaratamiz
const app = express();

// Fayl tizimi bilan ishlash uchun modul
const fs = require("fs");

// Foydalanuvchi ma'lumotlari uchun o'zgaruvchi
let user;

// user.json faylidan foydalanuvchi ma'lumotlarini o‘qiymiz
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR", err); // Agar xatolik bo‘lsa, konsolga chiqaradi
  } else {
    user = JSON.parse(data); // JSON matnni JS obyektga aylantiramiz
  }
});

// ================= MongoDB ulanish =================

// server.js dan bazani olib kelamiz
const db = require("./server").db();

// MongoDB ObjectId bilan ishlash uchun
const mongodb = require("mongodb");

// ================== Middleware lar ==================

// public papkasidagi statik fayllarni (CSS, JS, rasm) ishlatish
app.use(express.static("public"));

// JSON formatdagi so‘ni qabul qilish
app.use(express.json());

// Formadan keladigan ma'lumotlarni o‘qish
app.use(express.urlencoded({ extended: true }));

// ================== View sozlamalari =================

// View fayllar joylashgan papka
app.set("views", "views");

// Template engine sifatida EJS ishlatiladi
app.set("view engine", "ejs");

// ================== Routing ==================

// Yangi reja qo‘shish
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item"); // Endpoint chaqirilganini ko‘rsatadi

  // Formadan kelgan reja matni
  const new_reja = req.body.reja;

  // MongoDB ga yangi hujjat qo‘shamiz
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops); // Qo‘shilgan ma'lumotni konsolga chiqaradi
    res.json(data.ops[0]); // Frontend ga qo‘shilgan rejani qaytaradi
  });
});

// Bitta rejani o‘chirish
app.post("/delete-item", (req, res) => {
  const id = req.body.id; // O‘chiriladigan rejaning ID si

  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) }, // ID ni ObjectId ga aylantiramiz
    function (err, data) {
      res.json({ state: "success" }); // Frontend ga javob
    }
  );
});

// Rejani tahrirlash
app.post("/edit-item", (req, res) => {
  const data = req.body; // ID va yangi matn shu yerda keladi
  console.log(data); // Tekshirish uchun

  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) }, // Qaysi rejani yangilash
    { $set: { reja: data.new_input } }, // Yangi qiymat
    function (err, data) {
      res.json({ state: "success" });
    }
  );
});

// Barcha rejalarni o‘chirish
app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "Hamma rejalar o'chirildi" });
    });
  }
});

// ================== Author sahifasi ==================

app.get("/author", (req, res) => {
  // author.ejs ga user ma'lumotlarini yuboramiz
  res.render("author", { user: user });
});

// ================== Asosiy sahifa ==================

app.get("/", function (req, res) {
  console.log("user entered /"); // Bosh sahifaga kirildi

  // Bazadan barcha rejalarni olib kelamiz
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong"); // Xatolik bo‘lsa
      } else {
        // reja.ejs ga barcha rejalarni yuboramiz
        res.render("reja", { items: data });
      }
    });
});

// Ilovani boshqa fayllarda ishlatish uchun eksport qilamiz
module.exports = app;
