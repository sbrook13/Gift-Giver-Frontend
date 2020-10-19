const baseURL = 'http://localhost:3000';
const loginURL = `${baseURL}/login`;
const usersURL = `${baseURL}/users`;
const profileURL = `${baseURL}/profile`;

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', loginUser);

const newUserForm = document.querySelector('#create-user')
newUserForm.addEventListener('submit', createUser)

const authHeaders = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

function normalFetch(url, method, javascriptBody){
    headers = { 
        'Content-Type': 'application/json',
        'Content-Type': 'application/json'
    };
    body = JSON.stringify(javascriptBody);

    return fetch(url, {method, headers, body });
}

function authFetch(url, method, javascriptBody){
    headers = authHeaders
    body = JSON.stringify(javascriptBody);

    return fetch(url, {method, headers, body });
}

function loginUser(event){ 
    event.preventDefault()
    const loginInfo = new FormData(loginForm)
    let username = loginInfo.get('username').toLowerCase()
    const password = loginInfo.get('password')
    const user = { username, password }
    getToken(user)  
}

function getToken(user){
    normalFetch(loginURL, 'POST', user)
        .then(parseJSON)
        .then(result => {
            if(result.error){
                throw new Error(result.error)
            }
            setToken(result.token)
            showProfile()
        })
        .catch(handleError)
}

function showProfile(){
    fetch(profileURL)
        .then(parseJSON)
        .then(result => {
            if(result.erros){
                throw new Error('❌ Incorrect Username or Password')
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
    let username = formData.get('username').toLowerCase()
    const password = formData.get('password')
    const user = {user:{name, email, username, password}}
    
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
            setToken(newUser.token)
            showProfile()
        })
        .catch(handleError)
}

function setToken(token){
    localStorage.setItem('token', token)
}

function handleError(error){
    const errorMessage = document.querySelector('.error-message')
    errorMessage.innerText = error.message
    errorMessage.classList.remove('hidden');
}


