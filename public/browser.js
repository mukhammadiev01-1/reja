console.log("FrontEnd JS ishga tushdi"); // Frontend JS yuklanganini bildiradi

// Bitta reja uchun HTML template (li elementi)
function itemTemplate(item) {
  return `<li
          class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
          
          <!-- Reja matni -->
          <span class="item-text">${item.reja}</span>

          <div>
            <!-- Tahrirlash tugmasi -->
            <button
              data-id="${item._id}" <!-- MongoDB dagi ID -->
              class="edit-me btn btn-secondary btn-sm mr-1">
              O'zgartirish
            </button>

            <!-- O‘chirish tugmasi -->
            <button
              data-id="${item._id}" <!-- Qaysi reja ekanini bilish uchun -->
              class="delete-me btn btn-danger btn-sm">
              O'chirish
            </button>
          </div>
        </li>`;
}

// Reja kiritiladigan inputni olish
let createField = document.getElementById("create-field");

// Yangi reja qo‘shish (form submit)
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Sahifa reload bo‘lishini to‘xtatadi

  // Backendga yangi reja yuboriladi
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      // Yangi reja sahifaga qo‘shiladi (reloadsiz)
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));

      createField.value = ""; // Inputni tozalash
      createField.focus(); // Qaytadan fokus berish
    })
    .catch((err) => {
      console.log("Iltimos, qaytadan harakat qiling!");
    });
});

// Barcha click eventlar uchun umumiy listener
document.addEventListener("click", function (e) {
  console.log(e.target); // Qaysi element bosilganini ko‘rsatadi

  // ================= O‘CHIRISH =================
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Aniq ochirmoqchimisiz?")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id"), // Rejaning ID si
        })
        .then((response) => {
          console.log(response.data);
          // O‘chirilgan rejani DOM dan ham olib tashlaymiz
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("Iltimos, qaytadan harakat qiling!");
        });
    }
  }

  // ================= TAHRIRLASH =================
  if (e.target.classList.contains("edit-me")) {
    // Hozirgi matn bilan prompt ochiladi
    let userInput = prompt(
      "O'zgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );

    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"), // Qaysi reja
          new_input: userInput, // Yangi matn
        })
        .then((response) => {
          console.log(response.data);
          // Sahifadagi matnni ham yangilaymiz
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("Iltimos, qaytadan harakat qiling!");
        });
    }
  }
});

// ================= HAMMASINI O‘CHIRISH =================

// Oldingi variant (comment qilingan)
// document.getElementById("clean-all").addEventListener("click", function () {
//   axios.post("/delete-all", { delete_all: true }).then((response) => {
//     alert(response.data.state);
//     document.location.reload();
//   });
// });

// Hozirgi variant (tasdiqlash bilan)
document.getElementById("clean-all").addEventListener("click", function () {
  if (!confirm("Aniq o‘chirmoqchimisiz?")) return; // Foydalanuvchi rad etsa — chiqib ketadi

  axios.post("/delete-all", { delete_all: true }).then((response) => {
    alert(response.data.state); // Backend javobi
    document.location.reload(); // Sahifani yangilash
  });
});
