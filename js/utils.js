function displayError(errorMsg){
    let booksContainer = document.getElementById('books-container');
   booksContainer.innerHTML = `
     <h4 style='margin-left:80px'>An error occured with the network,try later</h4>
    `;
};


function  books(){
    fetch("https://book4.p.rapidapi.com/", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "4af4cfbea2msh5ea3bc42539843ep16841ejsn196cf74ea062",
            "x-rapidapi-host": "book4.p.rapidapi.com"
        }
    })
    .then(response => {
       console.log(response.json());
    }) 
    .catch(err => {
        console.error(err);
    });
}
books()


export{
    displayError,
}