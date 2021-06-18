import { displayError } from "./utils.js";
const Deafult_image =
  "https://s26162.pcdn.co/wp-content/uploads/2020/11/71HSe7Kt-xL.jpg";
// ======================Print Books to the Screen =====================
function fetchBooks() {
  displaySpinner(true);
  fetch("http://book.alitechbot.uz/api/books")
    .then((data) => data.json())
    .then((data) => {
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      data.forEach((item) => {
        const {
          imageLink = Deafult_image,
          country,
          language,
          pages,
          _id,
          title,
          category,
          price,
        } = item;
        const lastname = item.author?.lastName;
        booksContainer.innerHTML += `
                   <a href='book-details.html?id=${_id}' id="book">
                      <img src='${"https://s26162.pcdn.co/wp-content/uploads/2020/11/71HSe7Kt-xL.jpg"}'>
                        <div class="info">
                            <h6> ${country}</h6>
                            <div>
                            <h5> ${lastname} - ${title}</h5>
                            <p>Category:${category}
                            <p>Language: ${language}</p>
                            <p>Pages:${pages}</p>
                            <p>Price:${price}</p>
                            </div>
                        </div>
                        <button> Read More </button>
                    </a>
            `;
      });
      displaySpinner(false);
    })

    .catch((err) => {
      displayError(err.errorMsg);
      displaySpinner(false);
    });
}

//  ======================================Fetch Books By Id  ===================================
function fetchBookById() {
  var query = new URLSearchParams(location.search);
  let id = query.get("id");
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/books/${id}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const {
        imageLink = Deafult_image,
        author,
        country,
        language,
        year,
        pages,
        title,
        _id,
      } = data;
      const { lastName } = author;
      console.log(lastName);
      let booksContainer = document.getElementById("books-container");

      booksContainer.innerHTML += `
          
                   <a id="book" data-id='${_id}'>
                   <img src='${"https://s26162.pcdn.co/wp-content/uploads/2020/11/71HSe7Kt-xL.jpg"}'>
                        <div class="info">
                            <h4> ${country}</h4>
                            <h5>${lastName} - ${title}</h5>
                            <p>Language: ${language}</p>
                            <p>Pages:${pages}</p>
                            <p>Year:${year}</p>
                        </div>
                    </a>
            `;
      displaySpinner(false);
    })

    .catch((err) => {
      displayError(err.errorMsg);
      displaySpinner(false);
    });
}

// ===============================Print Authors to the Screen =======================================

function fetchAuthors() {
  displaySpinner(true);
  fetch("http://book.alitechbot.uz/api/authors")
    .then((data) => data.json())
    .then((data) => {
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      data.forEach((item) => {
        // console.log(item);
        const { firstName, lastName, phone, _id } = item;
        booksContainer.innerHTML += `
            <a href = 'author-details.html?id=${_id}' id="author-list">
            
            <p><h4>First-name</h4>: ${firstName}</p>
            <p><h4>Last-name</h4>: ${lastName}</p>
            <p><h4>phone-number</h4>: ${phone}</p>
            
            </a href = 'author-details.html'>
            `;
        // console.log(item);
      });
      displaySpinner(false);
    })
    .catch((err) => {
      displayError(err.message);
      displaySpinner(false);
    });
}

// ==================================Print Books to the  By Choosen Id =======================================
function fetchAuthorById() {
  var query = new URLSearchParams(location.search);
  let id = query.get("id");
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/authors/${id}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      let booksContainer = document.getElementById("books-container");

      const { firstName, lastName, phone, id } = data;
      booksContainer.innerHTML += `
            <a href="author-details.html" id="author-list">
            
            <p><h4>First-name</h4>: ${firstName}</p>
            <p><h4>Last-name</h4>: ${lastName}</p>
            <p><h4>phone-number</h4>: ${phone}</p>
            
            </a >
            `;
      displaySpinner(false);
    })

    .catch((err) => {
      displayError(err.message);
      displaySpinner(false);
    });
}
function displaySpinner(loading = true) {
  const spinner = `
    <div class="spin-container">
    <div class="spin" id="loader"></div>
    <div class="spin" id="loader2"></div>
    <div class="spin" id="loader3"></div>
    <div class="spin" id="loader4"></div>
    <span id="text">LOADING...</span>
  </div>
    `;
  if (loading) {
    document.body.innerHTML += spinner;
  } else {
    const spinner = document.querySelector(".spin-container");
    document.body.removeChild(spinner);
  }
}
window.onload = function () {
  let currentPage = location.pathname;
  if (currentPage === "/authors.html") {
    fetchAuthors();
  } else if (currentPage.startsWith("/author-details.html")) {
    fetchAuthorById();
  } else if (currentPage.startsWith("/book-details.html")) {
    fetchBookById();
  } else if (currentPage === "/books.html") {
    fetchBooks();
  }
};

//    let authorButton = document.getElementById('authors');

//    authorButton.addEventListener('click',(event)=>{
//    console.log(event);
//    let booksContainer = document.getElementById('books-container');
//    booksContainer.style.cssText = 'padding:10px'
//    let authors = event.target;
//    authors.style.cssText = 'color:green;width:50%;'
//    let book = document.getElementById('books')
//    book.style.cssText = 'color:black;width:50%;padding:0 30px'
//    fetchAuthors()
// })
// const bookGroup = document.getElementById('books')
//     bookGroup.addEventListener('click',(event)=>{
//         let booksContainer = document.getElementById('books-container');
//         booksContainer.style.cssText = 'padding-top:10px'
//         event.target.style.cssText = 'color:green; width:50%;padding:0 30px;'
//         let authors = document.getElementById('authors');
//         authors.style.cssText = 'color:black;width:50%'
//         fetchBooks()
//     })

export { fetchBooks };
