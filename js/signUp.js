function signUp(event){
    event.preventDefault();

    const signForm = document.getElementById('sign-up')
    const{email,password,firstName,lastName} = signForm
    console.log(signForm);
    const user = {
        email:email.value,
        password:password.value,
        firstName:firstName.value,
        lastName:lastName.value,
    }
    console.log(user);
    localStorage.setItem('user',JSON.stringify(user))
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      };
      fetch("http://book.alitechbot.uz/api/sign-up", requestOptions)
       .then(res=> res.json())
       .then(data=>{
           console.log(data);
        if (data.success) {
            Swal.fire({
              title: 'Sign Up',
              text: 'Your are sign up successfully',
              icon: 'success',
              showCancelButton: true,
              showCloseButton: true,
              timer: 3000
            }).then(result => {
              window.location.pathname = '/books.html';
              localStorage.setItem('token',data.token)
              localStorage.getItem('user')
            })
          } else {
            Swal.fire({
                title: 'Hatolik',
                text: error.message,
                icon: 'error',
                showCancelButton: true,
                showCloseButton: true,
                timer: 5000
              })
          }
        })
        .catch(error => {
            Swal.fire({
                title: 'Hatolik',
                text: error.message,
                icon: 'error',
                showCancelButton: true,
                showCloseButton: true,
                timer: 5000
              })
        });
       
}



function login(event) {
    event.preventDefault();
  
    const bookForm = document.getElementById('login');
    const { email, password } = bookForm;
    const user = {
      email: email.value,
      password: password.value,
    };
    console.log(user);
  
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
  
    fetch("https://book.alitechbot.uz/api/login", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result);
        if ( result.success === true) {
          Swal.fire({
            title: 'Logged in',
            text: 'Your are logged in successfully',
            icon: 'success',
            showCancelButton: true,
            showCloseButton: true,
            timer: 3000
          }).then(result=>{
            window.location.pathname = '/books.html'
          })
          
    localStorage.setItem('token',result.token)
        }
         else {
            Swal.fire({
                title: 'Hatolik',
                text: error.message,
                icon: 'error',
                showCancelButton: true,
                showCloseButton: true,
                timer: 5000
              })
        }
      })
      
      .catch(error => {
        Swal.fire({
          title: 'Hatolik',
          text: error.message,
          icon: 'error',
          showCancelButton: true,
          showCloseButton: true,
          timer: 5000
        })
      });
  }
