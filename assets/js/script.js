// VARIABILI GLOBALI
const url = "https://striveschool-api.herokuapp.com/books";
const row = document.getElementById("rowCard");
const firstCol = document.getElementById("firstCol");
let arrayBooks = [];

// FUNZIONI

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
  if (!col) {
    col = document.createElement("div");
    col.id = "colShopping";
    const h2 = document.createElement("h2");
    h2.innerText = "shopping";
    h2.classList.add("text-uppercase", "display-3", "text-center", "fw-bold", "text-white");
    col.appendChild(h2);
    const containerCol = document.createElement("div");
    containerCol.classList.add("bg-success", "bg-opacity-75");
    col.appendChild(containerCol);
  }

  col.classList.add("col-2");
  const div = document.createElement("div");
  div.classList.add("d-flex", "justify-content-between", "align-items-center", "card", "p-3");
  firstCol.className = "col-10";
  const book = arrayBooks[index];
  const cardImg = document.createElement("img");
  cardImg.classList.add("img-fluid", "rounded-start");
  cardImg.src = book.img;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "fs-5", "fw-semibold");
  cardText.innerText = book.price + "€";
  div.append(cardImg, cardText);
  col.appendChild(div);
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
    generateShopping(index);
  } else {
    return;
  }
});

// richiamo il fetch
window.addEventListener("DOMContentLoaded", () => {
  getBooks();
});
