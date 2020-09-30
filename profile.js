// function showPersonDetails() {
//     var popup = document.querySelector('#person-2-info');
//     popup.classList.toggle("show");
//   }
console.log(localStorage.token)
const baseURL = 'http://localhost:3000';
const profileURL = `${baseURL}/profile`;
const lovedOnesURL = `${baseURL}/loved_ones`;

// console.log(request.headers["Authorization"])

const lovedOnesSection = document.querySelector('#loved-ones-section')
const addPersonForm = document.querySelector('#new-person-form')
addPersonForm.addEventListener = ('submit', getPersonInfo);


const auth_headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

function parseJSON(response) {
    return response.json()
}

fetch(profileURL, { auth_headers })
    .then(parseJSON)
    .then(user => {
        const welcomeMessage = document.createElement('h2')
        const header = document.querySelector('.welcome')
        welcomeMessage.textContent = `Hello ${user.name}`
        header.append(welcomeMessage)

        user.loved_ones.forEach(displayPerson)
    })

function getPersonInfo(event){
    event.preventDefault()
    const formData = new FormData(addPersonForm)
    const name = formData.get('name')
    const relationship = formData.get('relationship')
    const birthday = formData.get('birthday')
    const gender = formData.get('gender')
    const mailing_address1 = formData.get('mailing_address1')
    const mailing_address2 = formData.get('mailing_address2')
    const mailing_city = formData.get('mailing_city')
    const mailing_state = formData.get('mailing_state')
    const mailing_zip = formData.get('mailing_zip')
    const image_url = formData.get('image_url')
    const person = { name, relationship, birthday, gender, mailing_address1, mailing_address2, mailing_city, mailing_state, mailing_zip, image_url }
    console.log(person)
    // persistPerson(person)

}

function persistPerson(person){
    fetch('http://localhost:3000/loved_ones', {
        method: "POST",
        headers: auth_headers, 
        body: JSON.stringify(person)
    })
    displayPerson(person)
}

function displayPerson(person){
    const personCard = document.createElement('div')
    personCard.classList.add('person-card')
    personCard.setAttribute("id", `person-info-${person.id}`)

    const title = document.createElement('h2')
    title.textContent = `${person.name} - ${person.relationship}`

    const image = document.createElement('img')
    image.src = person.image_url

    const ageText = document.createElement('h3')
    const age = "UPDATE WITH CALCULATION"
    ageText.textContent = `Age ${age}`

    const detailPopup = document.createElement('span')
    detailPopup.classList.add('popup-info')
    detailPopup.setAttribute('id', `person-${person.id}-info`)

    const birthday = document.createElement('p')
    birthday.textContent = person.birthday

    const address = document.createElement('p')
    const cityState = document.createElement('p')

    address.textContent = `${person.mailing_address1}, ${person.mailing_address2}`
    cityState.textContent = `${person.mailing_city}, ${person.mailing_state} ${person.mailing_zip}`
    
    const gender = document.createElement('p')
    gender.textContent = person.gender

    personCard.append(title, gender, image, ageText, birthday, address, cityState)
    lovedOnesSection.append(personCard)
}



// https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png
