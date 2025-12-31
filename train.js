// B-TASK
//// Berilgan so'z ichida necha marta son qatnashganini topish
function countDigits(word) {
  let count = 0;

  for (let number of word) {
    if (number >= "0" && number <= "9") {
      count++;
    }
  }

  return count;
}
console.log(countDigits("icd67jfo90lkm3gb8"));

// A-TASK:
// Berilgan harf berilgan so'z ichida necha marta qatnashganini topish

//function countLetter(letter, word) {
//  let count = 0;

//  for (let char of word) {
//    if (char === letter) {
//      count++;
//    }
//  }
//  return count;
//}

//console.log(countLetter("q", "identification"))
//console.log(countLetter("i", "identification"))

//console.log("Jack Ma maslahatlari"); // Konsolga sarlavha chiqaradi

// Maslahatlar ro‘yxati (yosh oralig‘iga qarab)
//const list = [
//  "yaxshi talaba bo'ling", // 0–20 yosh
//  "to'g'ri boshlq tanlang va ko'proq xato qiling", // 20–30 yosh
//  "uzingizga ishlashingizni boshlang", // 30–40 yosh
//  "siz kuchli bo'lgan narsalarni qiling", // 40–50 yosh
//  "yoshlarga investitsiya qiling", // 50–60 yosh
//  "endi dam oling, foydasi yoq endi", // 60+ yosh
//];

/* =========================
   1) CALLBACK VERSION
   Eski usul: funksiya ichida
   natija callback orqali qaytadi
========================= */
//function maslahatBeringCb(a, callback) {
// Agar kiritilgan qiymat number bo‘lmasa — xato
//  if (typeof a !== "number") return callback("insert a number", null);

// Yosh oralig‘iga qarab maslahat qaytaradi
//  if (a <= 20) return callback(null, list[0]);
//  if (a > 20 && a <= 30) return callback(null, list[1]);
//  if (a > 30 && a <= 40) return callback(null, list[2]);
//  if (a > 40 && a <= 50) return callback(null, list[3]);
//  if (a > 50 && a <= 60) return callback(null, list[4]);

// 60 dan katta bo‘lsa — 5 soniyadan keyin javob beradi
//  setTimeout(() => callback(null, list[5]), 5000);
//}

//console.log("passed here 0 (callback)"); // Asyncdan oldin ishlaydi

// Callback funksiyani chaqirish
//maslahatBeringCb(65, (err, data) => {
//  if (err) console.log("ERROR:", err); // Xato bo‘lsa
//  else console.log("javob:", data);    // Natija bo‘lsa
//});

//console.log("passed here 1 (callback)"); // Javobdan oldin chiqadi

/* =========================
   2) PROMISE VERSION
   Callback → Promise ko‘rinishi
   then / catch ishlatiladi
========================= */
//function maslahatBeringPromise(a) {
// Promise obyektini qaytaradi
//  return new Promise((resolve, reject) => {
// Ichida callback funksiyani ishlatyapmiz
//    maslahatBeringCb(a, (err, data) => {
//      if (err) reject(err);   // Xato bo‘lsa reject
//     else resolve(data);     // Natija bo‘lsa resolve
//    });
//  });
//}

//console.log("passed here 0 (promise)"); // Promise ishga tushishidan oldin

// Promise ishlatish: then / catch
//maslahatBeringPromise(20)
//  .then((data) => console.log("javob:", data)) // Muvaffaqiyatli natija
//  .catch((err) => console.log("ERROR:", err)); // Xato bo‘lsa

//console.log("passed here 1 (promise)"); // Natijadan oldin chiqadi

/* =========================
   3) ASYNC / AWAIT VERSION
   Eng qulay va zamonaviy usul
========================= */

// Kutish uchun yordamchi funksiya (delay)
//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//async function maslahatBeringAsync(a) {
// Agar number bo‘lmasa — xato tashlaydi
//  if (typeof a !== "number") throw new Error("insert a number");

// Yoshga qarab maslahat qaytaradi
//  if (a <= 20) return list[0];
//  if (a > 20 && a <= 30) return list[1];
//  if (a > 30 && a <= 40) return list[2];
//  if (a > 40 && a <= 50) return list[3];
//  if (a > 50 && a <= 60) return list[4];

// 5 soniya kutadi (real async)
//  await sleep(5000);
//  return list[5];
//}

// Async funksiyalarni chaqirish uchun wrapper
//async function run() {
//  try {
//    console.log("passed here 0 (async/await)"); // Boshlandi

// await — Promise tugashini kutadi
//    console.log(await maslahatBeringAsync(20));
//    console.log(await maslahatBeringAsync(31));
//    console.log(await maslahatBeringAsync(41));

//    console.log("passed here 1 (async/await)"); // Tugadi
//  } catch (err) {
// Xatolar shu yerda ushlanadi
//    console.log("ERROR:", err.message);
//  }
//}

// Async jarayonni ishga tushiradi
//run();

/* =========================
   ESLATMA:
   setTimeout → bir marta ishlaydi
   setInterval → cheksiz takrorlanadi
========================= */
