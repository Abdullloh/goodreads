function displayError(errorMsg){
    let booksContainer = document.getElementById('books-container');
   booksContainer.innerHTML = `
     <h4 style='margin-left:80px'>An error occured with the network,try later</h4>
    `;
};





export{
    displayError,
}