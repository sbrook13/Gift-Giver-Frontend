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
        .then(response => response.json())
        .then(result => {
            console.log(result.token)
            localStorage.setItem('token', result.token)
            showProfile()
        })
        // .then(response => {
        //     if(response.ok){
        //         result = parseJSON(response)
        //         console.log(result)
        //         localStorage.setItem('token', result.token)
        //         showProfile()
        //     } else {
        //         console.log(response)
        //         result = parseJSON(response)
        //         console.log(result)
        //         const errorMessage = document.querySelector('#login-error-message')
        //         errorMessage.innerText = 'Please login to proceed'
        //     }
    }

function showProfile(){
    fetch(profileURL, { headers: auth_headers })
        .then(response => {
            if(response.ok){
                window.location.href = '/profile.html'
            } else {
                console.log(response)
                result = parseJSON(response)
                console.log(result)
                const errorMessage = document.querySelector('#login-error-message')
                errorMessage.innerText = 'Incorrect Username or Password'
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
        .then(newUserToken)
        .then(showProfile)
}

function newUserToken(newUser){
    localStorage.setItem('token', newUser.token)
}