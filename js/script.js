import { displayError } from "./utils.js";

const Deafult_Writer_Image =
  "https://english.alaraby.co.uk/sites/default/files/media/images/A50684E5-9414-4139-AA23-BDB40912618E.jpg";

const Default_Author_Image =
  "https://cdn.pixabay.com/photo/2012/11/28/11/10/shakespeare-67698__340.jpg";
// ======================Print Books to the Screen =====================
function fetchBooks() {
  displaySpinner(true);
  fetch("http://book.alitechbot.uz/api/books")
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const { docs } = data.payload;
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      docs.forEach((item) => {
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
                   <div id="book" >
                      <img src='${validateImage(imageLink)}'>
                        <div class="info">
                           <div id='cont'>
                           <h6> ${country}</h6>
                           <a onclick="modalShow('${_id}')">Add  Cooments</a>
                           </div>
                            <div>
                            <h5> ${lastname}  - ${title}</h5>
                            <p>Category:${category}
                            <p>Language: ${language}</p>
                            <p>Pages:${pages}</p>
                            <p>Price:${price}</p>
                            </div>
                        </div>
                        <a class="want" onclick="wantRead('${_id}')"> Add To Favourites </a>
                        <a class="button" href='book-details.html?id=${_id}'> Read More </a> 
                        
                    </div>
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

/* =========================Fetch Book By Id ============================*/

function fetchBookById() {
  var query = new URLSearchParams(location.search);
  let id = query.get("id");
  console.log(id);
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/books/${id}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const { book } = data.payload;
      const { comment } = data.payload;
    
      console.log(book);
      const { imageLink, author, country, language, year, pages, title, _id,description } =
        book;
      const { lastName } = author;
      console.log(lastName);
      let booksContainer = document.getElementById("books-container");

      booksContainer.innerHTML += `
                   <div id="book" data-id='${_id}'>
                   <img src='${validateImage(imageLink)}'/>
                        <div class="info">
                            <h4> ${country}</h4>
                            <h5>${lastName} - ${title}</h5>
                            <p>Language: ${language}</p>
                            <p>Pages:${pages}</p>
                            <p>Year:${year}</p>
                            <div id='list'>
                            ${description}
                           </div>
                        </div>
                    </div>
            `;
            let commentHtml = document.getElementById('list')
            comment.forEach((item) => {
              console.log(item);
              const{firstName,lastName} = item.user
              const {text} = item
              commentHtml.innerHTML+=`
                 <li>${firstName} commented : ${text} </li>
                    
              `
                 
            });
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
      const { payload } = data;
      console.log(data);
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      payload.forEach((item) => {
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
// -------------------------------------MY Favourite Books ------------------------------------
function myFavor() {
  console.log('installing');
  displaySpinner(true);
  var requestOptions = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    // redirect: "follow",
  };
  
  fetch("https://book.alitechbot.uz/api/users/shelf", requestOptions)
  // console.log('fetching')
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      const { shelf } = result.payload;
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      shelf.forEach((item) => {
        console.log(item);
        const {
          imageLink,
          country,
          language,
          pages,
          _id,
          author,
          title,
          category,
          price,
        } = item;
        console.log(author);
        const lastname = item.author?.lastName;
        booksContainer.innerHTML += `
        <div  id="book">
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
             <div  class="delete">
             <a href='book-details.html?id=${_id}' > Read More </a >
             <i onclick="deleteBook('${_id}')"  class="fas fa-trash-alt"></i>
             </div>
             
         </divs>
 `;
      });
      displaySpinner(false);
    })
    .catch((err) => {
      displayError(err.message);
      displaySpinner(false);
    });
}
// ----------- ------------------------- MY BOOKS  ----------------------------------------
function myBooks() {
  displaySpinner(true);
  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
    },
    redirect: "follow",
  };
  fetch("https://book.alitechbot.uz/api/books/my-books", requestOptions)
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      const { payload } = result;
      let booksContainer = document.getElementById("books-container");
      booksContainer.innerHTML = "";
      payload.forEach((item) => {
        console.log(item);
        const {
          imageLink,
          country,
          language,
          pages,
          _id,
          author,
          title,
          category,
          price,
        } = item;
        console.log(author);
        const lastname = item.author?.lastName;
        booksContainer.innerHTML += `
        <div  id="book">
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
             <div  class="delete">
             <a href='book-details.html?id=${_id}' > Read More </a >
             <i onclick="deleteBook('${_id}')"  class="fas fa-trash-alt"></i>
             </div>
             
         </divs>
 `;
      });
      displaySpinner(false);
    })
    .catch((err) => {
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
    myBooks();
  }else if (currentPage.startsWith("/myFavor.html")) {
    myFavor();
  }
   else if (currentPage.startsWith("/books.html")) {
    fetchBooks();
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
export {displaySpinner}
export { fetchBooks, fetchAuthors };
