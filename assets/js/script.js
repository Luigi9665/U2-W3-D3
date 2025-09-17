// VARIABILI GLOBALI
const url = "https://striveschool-api.herokuapp.com/books";
const row = document.getElementById("rowCard");
const firstCol = document.getElementById("firstCol");
let arrayBooks = [];
let booksShopping = [];
const container = document.getElementById("containerCard");
// FUNZIONI

// salvataggio in localestorage
const addToLocal = (array) => {
  localStorage.setItem("books-memory", JSON.stringify(array));
};

// // funzione per la generazione delle card
const generateCard = (book, index) => {
  const col = document.createElement("div");
  col.classList.add("col");
  col.setAttribute("data-index", index);
  const card = document.createElement("div");
  card.classList.add("card", "h-100");
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.style.height = "300px";
  cardImg.src = book.img;
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column", "justify-content-between", "align-items-center");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = book.title;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "fs-2", "fw-semibold");
  cardText.innerText = book.price + "€";
  const divBtn = document.createElement("div");
  divBtn.classList.add("d-flex", "flex-column", "gap-3", "w-100");
  const btnAdd = document.createElement("button");
  btnAdd.classList.add("btn", "bg-success");
  btnAdd.setAttribute("btnadd-index", index);
  btnAdd.innerText = "Aggiungi al carrello";
  const btnRemove = document.createElement("button");
  btnRemove.classList.add("btn", "bg-danger");
  btnRemove.setAttribute("btnremove-index", index);
  btnRemove.innerText = "Elimina";
  divBtn.append(btnAdd, btnRemove);
  cardBody.append(cardTitle, cardText, divBtn);
  card.append(cardImg, cardBody);
  col.appendChild(card);
  row.appendChild(col);
};

// funzione per la creazione del del carrello + dichiarazione delle variabili necessarie

const generateShopping = (index) => {
  let col = document.getElementById("colShopping");
  let containerCol = "";
  if (!col) {
    const container = document.getElementById("containerCard");
    container.className = "p-5";
    col = document.createElement("div");
    col.id = "colShopping";
    const h2 = document.createElement("h2");
    h2.innerText = "shopping";
    h2.classList.add("text-uppercase", "display-3", "text-center", "fw-bold", "text-white");
    col.appendChild(h2);
    const containerC = document.createElement("div");
    containerC.classList.add("bg-secondary", "bg-opacity-75", "text-center", "rounded-4", "p-2");
    containerC.id = "containerCol";
    containerCol = containerC;
    col.appendChild(containerC);
  } else {
    containerCol = document.getElementById("containerCol");
  }
  col.classList.add("col-2");
  const div = document.createElement("div");
  div.classList.add("d-flex", "justify-content-between", "align-items-center", "my-3");
  div.setAttribute("shopping-index", index);
  firstCol.className = "col-10";
  const book = booksShopping[index];
  const cardImg = document.createElement("img");
  cardImg.classList.add("img-fluid", "rounded-start");
  cardImg.src = book.img;
  cardImg.style.height = "200px";
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "fs-5", "fw-semibold");
  cardText.innerText = book.price + "€";
  const i = document.createElement("i");
  i.classList.add("fs-4", "text-danger");
  i.style.cursor = "pointer";
  i.innerHTML = `<i class="bi bi-trash3" icon-index="${index}"></i>`;
  div.append(cardImg, cardText, i);
  containerCol.appendChild(div);
  firstCol.after(col);
};

// fetch per prenderci i dati dall'API e generazione card
const getBooks = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      for (let i = 0; i < data.length; i++) {
        const book = data[i];
        generateCard(book, i);
      }
      arrayBooks = data;
    })
    .catch((error) => {
      alert(error);
    });
};

// funzione per la rimozionde della card dal sito
const removeCard = (index) => {
  const div = document.querySelector(`div[data-index="${index}"]`);
  if (div) {
    div.remove();
  } else {
    return;
  }
};

// ADDEVENTLISTENER per rimozione della card o add to cart
row.addEventListener("click", (e) => {
  const target = e.target;
  //   console.log(target);
  if (target.tagName === "BUTTON" && target.hasAttribute("btnremove-index")) {
    const index = target.getAttribute("btnremove-index");
    removeCard(index);
  } else if (target.tagName === "BUTTON" && target.hasAttribute("btnadd-index")) {
    const index = target.getAttribute("btnadd-index");
    const bookSendToArray = arrayBooks[index];
    booksShopping.push(bookSendToArray);
    addToLocal(booksShopping);
    generateShopping(booksShopping.length - 1);
  } else {
    return;
  }
});

// elimina book nella lista shopping

const removeShop = (index) => {
  booksShopping.splice(index, 1);
  addToLocal(booksShopping);
  const div = document.querySelector(`div[shopping-index="${index}"]`);
  if (div) {
    div.remove();
  } else {
    return;
  }
};

container.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target);
  if (target.tagName === "I" && target.hasAttribute("icon-index")) {
    const index = target.getAttribute("icon-index");
    removeShop(index);
  }
});

// richiamo il fetch
window.addEventListener("DOMContentLoaded", () => {
  getBooks();
  const hasBooks = localStorage.getItem("books-memory");
  if (hasBooks) {
    const books = JSON.parse(hasBooks);
    booksShopping = books;
    for (let i = 0; i < booksShopping.length; i++) {
      generateShopping(i);
    }
  }
});
