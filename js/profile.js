
let storage = localStorage.getItem('user')

window.addEventListener('load',()=>{
    const data = JSON.parse(storage);
    let {email,password,firstName,lastName} = data
    console.log(data);
    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')
    const firstNameInput = document.querySelector('#firstName')
    const lastNameInput = document.querySelector('#lastName')
    emailInput.value=`
    ${email}
    `
    passwordInput.value=`
    ${password}
    `
    firstNameInput.value=`
    ${firstName}
    `
    lastNameInput.value=`
    ${lastName}
    `
})

function submitHandler(event){
    event.preventDefault()
    const profile = document.querySelector('#profileForm')
    const{email,lastName,firstName,password} = profile
    console.log(email);
    const newUser = {
        email:email.value,
        password:password.value,
        firstName:firstName.value,
        lastName:lastName.value
    }
    console.log(newUser);
    var requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*' },
        body: JSON.stringify(newUser),
      };
      fetch("http://book.alitechbot.uz/api/sign-up", requestOptions)
      .then(res=> res.json())
    //   .then(data=>console.log(data))
}

