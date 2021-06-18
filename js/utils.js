function displayError(errorMsg){
    let booksContainer = document.getElementById('books-container');
   booksContainer.innerHTML = `
     <h4 style='margin-left:80px'>An error occured with the network,try later</h4>
    `;
};

// function displayLoader(loading = true){
//     const  spinner = `
//     <div id="spinner-wrapper">
//         <div class="spinner-border" role="status">
//         <span class="visually-hidden">Loading...</span>
//         </div>
//     <div>
//     `
//     if(loading){
//         document.body.innerHTML += spinner;
//     }else{
//         const spinner = document.getElementById('spinner-wrapper')
//         document.body.removeChild(spinner)
//     }
// }



export{
    displayError,
    // displayLoader,
}