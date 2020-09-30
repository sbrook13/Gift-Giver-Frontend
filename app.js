const baseURL = 'http://localhost:3000';
const loginURL = `${baseURL}/login`;
const usersURL = `${baseURL}/users`;

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', loginUser);

const newUserForm = document.querySelector('#create-user')
newUserForm.addEventListener('submit', createUser)

const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

function loginUser(event){ 
    event.preventDefault()
    const loginInfo = new FormData(loginForm)
    const username = loginInfo.get('username')
    const password = loginInfo.get('password')
    const user = { username, password }
    console.log(user)
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
        .then(response => {
            if (response.ok){
                parseJSON(response)  
            } else {
                result = parseJSON(response)
                const errorMessage = document.querySelector('#login-error-message')
                console.log(result)
                // errorMessage.innerText = response.errors
            }
        })
        .then(result => {
            localStorage.setItem('token', result.token)
            showProfile()
        })
 
    }

function showProfile(){
    fetch(usersURL, { headers })
        .then(response => {
            console.log(`${localStorage.token}`)
            if(response.ok){
                window.location.href = '/profile.html'
            } else {
                const errorMessage = document.querySelector('#login-error-message')
                errorMessage.innerText = 'Please login to proceed'
            }
        })
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
    const user = {"user":{name, email, username, password}}
    console.log(user)
    
    fetch(usersURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(parseJSON)
        .then(newUser => newUserToken(newUser))
        .then(showProfile)
}

function newUserToken(newUser){
    localStorage.setItem('token', newUser.token)
}

function getUsers(){
    fetch(usersURL)
        .then(parseJSON)
        .then(response => console.log(response))
}