// -------------------------------Add Book From --------------------------
async function addBookForm() {
  const auth = await fetch("http://book.alitechbot.uz/api/authors");
   const authors = await auth.json();
   const {payload} = authors
   const authOptions = payload.map(item=>  `<option value='${item._id}'> ${item.lastName} </option>`)

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
            <input required type="text" name="pages" placeholder="Pages">
            <input required type="number" name="price" placeholder="Price">
            <input style="width: 45%;" required type="file" name="imageLink" placeholder="Image">
            <input required type="text" name="country" placeholder="Country">
            <input required type="text" name="language" placeholder="Language">
            <input required type="text" name="category" placeholder="Category">
            <select id="author" name="author" >
            <option value="select Author" selected>Select Author </option>
            ${authOptions}
            </select>
           <textarea name="description"></textarea>
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
// ----------------------------------Add Author Form --------------------------------
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
          <input type="text" name="lastName" placeholder="lastName">
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
  // ---------------------------------Create Book --------------------------------------
  function createBook() {
    const bookForm = document.getElementById('new-book-form');
    const { title, pages, imageLink, author, category, country, price,language,description} = bookForm;
    console.log(title);
    console.log(description);
    const book = {
      language:language.value,
      title: title.value,
      pages: pages.value,
      imageLink: imageLink.value,
      author: author.value,
      category: category.value,
      country: country.value,
      price: price.value,
      description:description.value
    };
    console.log(book);
    let formData = new FormData()
    formData.append('title',title.value)
    formData.append('pages',pages.value)
    formData.append('image',imageLink.files[0])
    formData.append('author',author.value)
    formData.append('category',category.value)
    formData.append('country',country.value)
    formData.append('price',price.value)
    formData.append('language',language.value)
    formData.append('description',description.value)
  
    var requestOptions = {
      method: 'POST',
      headers: { 
        // 'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.token}`,
        'Access-Control-Allow-Origin':'*'
     },
      body:formData,
      redirect: 'follow'
    };
  
    fetch("https://book.alitechbot.uz/api/books", requestOptions)
      .then(response => response.json())
      .then(result => {
        
        console.log(result);
        if (result.success != false) {
          window.Swal.fire({
            title: 'Kitob yuklandi',
            text: 'Siz taqdim qilgan kitob yaratildi',
            icon: 'success',
            showCancelButton: true,
            showCloseButton: true,
            timer: 3000
          }
          ).then(()=> (location.pathname='/books.html'))
          
        
  
       
  
        }
        //  else {
        //   Swal.fire({
        //     title: 'Hatolik',
        //     text: result.error,
        //     icon: 'error',
        //     showCancelButton: true,
        //     showCloseButton: true,
        //     timer: 5000
        //   })
        // }
      })
      .catch(error => console.log('error', error));
  }
  // -----------------------------------------Create Author ------------------------------
  function createAuthor() {
    const bookForm = document.getElementById('new-author-form');
    const { lastName, firstName } = bookForm;
    const author = {
      firstName: firstName.value,
      lastName: lastName.value,
    };
    console.log(author);
  
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${localStorage.token}`},
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
          })
         
  
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
 
  window.addBookForm = addBookForm;