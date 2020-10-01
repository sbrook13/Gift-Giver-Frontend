const baseURL = 'http://localhost:3000';
const loginURL = `${baseURL}/login`;
const usersURL = `${baseURL}/users`;
const profileURL = `${baseURL}/profile`;

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', loginUser);

const newUserForm = document.querySelector('#create-user')
newUserForm.addEventListener('submit', createUser)

const auth_headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

function loginUser(event){ 
    event.preventDefault()
    const loginInfo = new FormData(loginForm)
    const username = loginInfo.get('username')
    const password = loginInfo.get('password')
    const user = { username, password }
    getToken(user)  
}

function getToken(user){
    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(parseJSON)
        .then(result => {
            if(result.errors){
                throw new Error(result.errors[0])
            }
            localStorage.setItem('token', result.token)
            showProfile()
        })
        .catch(handleError)
    }

function showProfile(){
    fetch(profileURL, { headers: auth_headers })
        .then(parseJSON)
        .then(result => {
            if(result.erros){
                throw new Error('Incorrect Username or Password')
            }
            window.location.href = '/profile.html'  
        })
        .catch(handleError)
}

function parseJSON(response) {
    return response.json()
}

function createUser(event){ 
    event.preventDefault()
    const formData = new FormData(newUserForm)
    const name = formData.get('name')
    const email = formData.get('email')
    let username = formData.get('username')
    username = username.toLowerCase()
    const password = formData.get('password')
    const user = {user:{name, email, username, password}}
    console.log(user)
    
    fetch(usersURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( user )
    })
        .then(parseJSON)
        .then(newUser => {
            if(newUser.errors){
                throw new Error(newUser.errors[0])
            }
            newUserToken(newUser.token)
            showProfile()
        })
        .catch(handleError)
}

function newUserToken(token){
    localStorage.setItem('token', token)
}

function handleError(error){
    const errorMessage = document.querySelector('.error-message')
    errorMessage.innerText = error.message
    errorMessage.classList.toggle('show')
}

// var add = require('date-fns/add')

// const age = add(new Date(1985, 8, 23), {
//     years: 35,
//     months: 2
//   })
// console.log(age)

// const dateTest = document.querySelector('#date-test')
// dateTest.innerText = `${age}`

const today = new Date()
const exBday = "1995-08-22"

function calculateAge(exBday, today){
    var nowMonth = today.getMonth( )+1;
    const nowYear = today.getFullYear( )
    let nowDay = today.getDate()

    const birthYear = exBday.split("-")[0]
    const birthMonth = exBday.split("-")[1]
    const birthDay = exBday.split("-")[2]

    age = (nowYear-birthYear)+((nowMonth-birthMonth)/12)+((nowDay-birthDay)/365)
    age = Math.floor(age)
    console.log(age)
}
calculateAge(exBday, today)