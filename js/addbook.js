
function addBookForm() {
    const form = `
    <div class="modal" tabindex="-1" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add new book</h5>
          </div>
          <div class="modal-body">
          <form id="new-book-form">
            <input required type="text" name="title" placeholder="Title">
            <input required type="number" name="pages" placeholder="Pages">
            <input required type="number" name="price" placeholder="Price">
            <input required type="url" name="imageLink" placeholder="Image">
            <input required type="text" name="country" placeholder="Country">
            <input required type="text" name="language" placeholder="Language">
            <input required type="text" name="category" placeholder="Category">
            <select name="author" id="select">
            <option value="60c227bd93aa306e2bf12ecb">Azamat</option>
            <option value="60c2282393aa306e2bf12ecc">Abdulhamid</option>
            </select>
          </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="createBook()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `;
  
    document.body.innerHTML += form;
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    myModal.show();
  }
  
  function addAuthorForm() {
    const form = `
    <div class="modal" tabindex="-1" id="myAuthorModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add new Author</h5>
          </div>
          <div class="modal-body">
          <form id="new-author-form">
          <input type="text" name="firstName" placeholder="First name">
            <input type="text" name="title" placeholder="Title">
          </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="createAuthor()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `;
  
    document.body.innerHTML += form;
    var myModal = new bootstrap.Modal(document.getElementById('myAuthorModal'), {
      keyboard: false
    })
    myModal.show();
  }
  
  function createBook() {
    const bookForm = document.getElementById('new-book-form');
    const { title, pages, imageLink, author, category, country, price,language } = bookForm;
    const book = {
      language:language.value,
      title: title.value,
      pages: pages.value,
      imageLink: imageLink.value,
      author: author.value,
      category: category.value,
      country: country.value,
      price: price.value
    };
    console.log(book);
  
    var requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
     },
      body: JSON.stringify(book),
      redirect: 'follow'
    };
  
    fetch("http://book.alitechbot.uz/api/books", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.Swal.fire({
            title: 'Kitob yuklandi',
            text: 'Siz taqdim qilgan kitob yaratildi',
            icon: 'success',
            showCancelButton: true,
            showCloseButton: true,
            timer: 3000
          });
  
          // fetchBooks()
  
        } else {
          Swal.fire({
            title: 'Hatolik',
            text: result.error,
            icon: 'error',
            showCancelButton: true,
            showCloseButton: true,
            timer: 5000
          })
        }
      })
      .catch(error => console.log('error', error));
  }
  
  function createAuthor() {
    const bookForm = document.getElementById('new-author-form');
    const { title, firstName } = bookForm;
    const author = {
      firstName: firstName.value,
      title: title.value,
    };
    console.log(author);
  
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author),
      redirect: 'follow'
    };
  
    fetch("http://book.alitechbot.uz/api/authors", requestOptions)
      .then(response => response.json())
      .then(result =>{
        if ( typeof result === 'object') {
          window.Swal.fire({
            title: 'Author yuklandi',
            text: 'Siz taqdim qilgan kitob yaratildi',
            icon: 'success',
            showCancelButton: true,
            showCloseButton: true,
            timer: 3000
          });
  
          // fetchBooks()
  
        } else {
          Swal.fire({
            title: 'Hatolik',
            text: result,
            icon: 'error',
            showCancelButton: true,
            showCloseButton: true,
            timer: 5000
          })
        }
      })
      .catch(error => console.log('error', error));
  }
 