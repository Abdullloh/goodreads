import { displayError } from "./utils.js";

const Deafult_Writer_Image ="https://s26162.pcdn.co/wp-content/uploads/2020/11/71HSe7Kt-xL.jpg";

const Default_Author_Image ="https://cdn.pixabay.com/photo/2012/11/28/11/10/shakespeare-67698__340.jpg";
// ======================Print Books to the Screen =====================
function fetchBooks() {
  displaySpinner(true);
  fetch("http://book.alitechbot.uz/api/books")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      data.forEach((item) => {
        const {
          imageLink,
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
                      <img src='${validateImage(imageLink)}'>
                        <div class="info">
                            <h6> ${country}</h6>
                            <div>
                            <h5> ${lastname}  - ${title}</h5>
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
window.fetchBooks = fetchBooks;

//  ======================================Fetch Books By Id  ===================================
function fetchBookById() {
  var query = new URLSearchParams(location.search);
  let id = query.get("id");
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/books/${id}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const { imageLink, author, country, language, year, pages, title, _id } =
        data;
      const { lastName } = author;
      console.log(lastName);
      let booksContainer = document.getElementById("books-container");

      booksContainer.innerHTML += `
          
                   <a id="book" data-id='${_id}'>
                   <img src='${validateImage(imageLink)}'>
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
  return fetch("http://book.alitechbot.uz/api/authors")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      data.forEach((item) => {
        const { firstName, lastName, _id, imageLink } = item;
        booksContainer.innerHTML += `
            <a href = 'author-details.html?id=${_id}' id="author-list">
            <img src='${validateImage(imageLink, true)}'>
            <div id='auth-cont'>
             <div> <b>First-name</b>: ${firstName}</div>
              <div><b>Last-name</b>: ${lastName || ""}</div>
            </div>
            <button> Read More </button>
            </a >
            `;

        // console.log(item);
      });
      displaySpinner(false);
      return data;
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
            
            <p><h4>First-name</h4>: ${firstName || ""}</p>
            <p><h4>Last-name</h4>: ${lastName || ""}</p>
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
// ------------------------------DISPLAY SPINNER --------------------------------
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
// 
// -------------------------------------MY BOOKS ------------------------------------
function myBooks() {
  displaySpinner(true);
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
   },
    redirect: 'follow'
  };
  fetch("http://book.alitechbot.uz/api/books/my-books",requestOptions)
    .then((data) => data.json())
    .then((result) => {
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      result.forEach(item=> {
        const {
          imageLink,
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
           <img src='${validateImage(imageLink)}'>
             <div class="info">
                 <h6> ${country}</h6>
                 <div>
                 <h5> ${lastname}  - ${title}</h5>
                 <p>Category:${category}
                 <p>Language: ${language}</p>
                 <p>Pages:${pages}</p>
                 <p>Price:${price}</p>
                 </div>
             </div>
             <button> Read More </button>
         </a>
 `
})
displaySpinner(false);

    }) .catch((err) => {
      displayError(err.message);
      displaySpinner(false);
    });
}
// 

// -----------------WINDOW ONLOAD ===========================
window.onload = function () {
  let currentPage = location.pathname;
  if (currentPage === "/authors.html") {
    fetchAuthors();
  } else if (currentPage.startsWith("/author-details.html")) {
    fetchAuthorById();
  } else if (currentPage.startsWith("/book-details.html")) {
    fetchBookById();
  } else if (currentPage.startsWith("/myBooks.html")) {
    myBooks()
  }else if(currentPage.startsWith('/books.html')){
    fetchBooks()
  }
};
// 
// ------------------------------VALIDATE IMAGE -----------------------------
function validateImage(img, isAuthor) {
  const existImageTypes = /\.(gif|jpe?g|png|webp|bmp|svg)$/i.test(img);
  if (img === "" || !existImageTypes) {
    return isAuthor ? Default_Author_Image : Deafult_Writer_Image;
  }
  return img;
}
// 


export { fetchBooks, fetchAuthors };
