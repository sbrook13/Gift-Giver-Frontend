// function showPersonDetails() {
//     var popup = document.querySelector('#person-2-info');
//     popup.classList.toggle("show");
//   }

const baseURL = 'http://localhost:3000';
const userURL = `${baseURL}/users`;
const profileURL = `${baseURL}/profile`;
const lovedOnesURL = `${baseURL}/loved_ones`;

const auth_headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
}

const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', logoutUser)

function logoutUser(){
    localStorage.clear()
    window.location.href = '/'
}

const addPersonForm = document.querySelector('#new-person-form')
addPersonForm.addEventListener = ('submit', getPersonInfo);

const lovedOnesSection = document.querySelector('#loved-ones-section')

function parseJSON(response) {
    return response.json()
}

fetch(profileURL, { headers: auth_headers })
    .then(response => response.json())
    .then(user => {
        console.log(user.loved_ones)
        const welcomeMessage = document.querySelector('.welcome')
        welcomeMessage.textContent = `Hello ${user.name}`

        user.loved_ones.forEach(displayPerson)
    })

for (let i = 0; i < addPersonForm.length; i++) {
    addPersonForm[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.children;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
    });
}

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
    const person = { name, relationship, birthday, gender, mailing_address1, mailing_address2, mailing_city, mailing_state, mailing_zip}
    persistPerson(person)

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
    console.log(person)
    const personCard = document.createElement('div')
    personCard.classList.add('person-card')
    personCard.setAttribute("id", `person-info-${person.id}`)
    personCard.addEventListener('click', event => showDetailsCard(event, person))

    addTitle(person, personCard)
    calculateAge(person, personCard)
    addGender(person, personCard)

    
    lovedOnesSection.append(personCard)
}

function addTitle(person, personCard){
    const title = document.createElement('h2')
    title.textContent = `${person.name} - ${person.relationship}`
    personCard.append(title)
}

function addGender(person, personCard){
    const gender = document.createElement('p')
    gender.textContent = person.gender
    personCard.append(gender)
}

function calculateAge(person, personCard){
    const today = new Date()
    const bday = new Date(person.birthday)
    const ageDif = today - bday
    const ageDate = new Date(ageDif)
    const age = Math.abs(ageDate.getUTCFullYear()-1970)
    addAge(age, personCard)
    addSearchButtons(person, age, personCard)
}

function addAge(age, personCard){
    const ageText = document.createElement('h3')
    ageText.textContent = `Age ${age}`
    personCard.append(ageText)
}

function addSearchButtons(person, age, personCard){
    const buttonSection = document.createElement('section')
    buttonSection.classList.add('button-section')

    const searchByAgeButton = document.createElement('button')
    searchByAgeButton.addEventListener('click', (event) => openAgeSearchWindow(event, person, age))
    searchByAgeButton.innerText = `Find gift ideas for Age ${age}`
    
    const searchByRelationshipButton = document.createElement('button')
    searchByRelationshipButton.addEventListener('click', (event) => openRelationshipSearchWindow(event, person))
    searchByRelationshipButton.innerText = `Find gift ideas for your ${person.relationship}`
    
    buttonSection.append(searchByAgeButton, searchByRelationshipButton)
    personCard.append(buttonSection)
}

function openAgeSearchWindow(event, person, age){
    console.log('clicked search by age button')
    window.open(`https://www.amazon.com/s?k=gifts+for+${age}+year+old+${person.gender}&ref=nb_sb_noss`, '_blank')
}

function openRelationshipSearchWindow(event, person){
    console.log('clicked search by relationship button')
    window.open(`https://www.amazon.com/s?k=gifts+for+${person.relationship}&ref=nb_sb_noss_1`, '_blank')
}

function showDetailsCard(event, person){
    console.log("div clicked")
    const detailPopup = document.createElement('span')
    detailPopup.classList.add('popup-info')
    detailPopup.setAttribute('id', `person-${person.id}-info`)

    const birthday = document.createElement('p')
    birthday.textContent = person.birthday

    const address = document.createElement('p')
    const cityState = document.createElement('p')

    address.textContent = `${person.mailing_address1}, ${person.mailing_address2}`
    cityState.textContent = `${person.mailing_city}, ${person.mailing_state} ${person.mailing_zip}`
    
    detailPopup.append(birthday, address, cityState)
}




