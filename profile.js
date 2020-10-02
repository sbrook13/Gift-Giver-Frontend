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

const logoutButton = document.querySelector('.logout-button')
logoutButton.addEventListener('click', logoutUser)

function logoutUser(){
    localStorage.clear()
    window.location.href = '/'
}

const addPersonButton = document.querySelector('#add-person-collapsible')
addPersonButton.addEventListener('click', showAddForm);

function showAddForm(){
    addPersonForm.classList.toggle('hidden')
    updateForm.classList.add('hidden')
}

const addPersonForm = document.querySelector('#new-person-form')
addPersonForm.addEventListener('submit', getPersonInfo);

const updateForm = document.querySelector('#update-form')
const lovedOnesSection = document.querySelector('#loved-ones-section')

function parseJSON(response) {
    return response.json()
}

fetch(profileURL, { headers: auth_headers })
    .then(response => response.json())
    .then(user => {
        const welcomeMessage = document.querySelector('.profile-header')
        welcomeMessage.textContent = `${user.name}`.toUpperCase()
    })

fetch(lovedOnesURL, { headers: auth_headers })
    .then(parseJSON)
    .then(getLovedOnes)

function getLovedOnes(lovedOnes){
    lovedOnes.forEach(displayPerson)
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
    const lovedOne = { name, relationship, birthday, gender, mailing_address1, mailing_address2, mailing_city, mailing_state, mailing_zip}
    persistPerson(lovedOne)

}

function persistPerson(lovedOne){
    fetch('http://localhost:3000/loved_ones', {
        method: "POST",
        headers: auth_headers, 
        body: JSON.stringify(lovedOne)
    })
    displayPerson(lovedOne)
}

function displayPerson(lovedOne){
    const personCard = document.createElement('div')
    personCard.classList.add('person-card')
    personCard.setAttribute("id", `person-info-${lovedOne.id}`)

    addTitle(lovedOne, personCard)
    calculateAge(lovedOne, personCard)
    addExpand(personCard)
    createDetailsCard(lovedOne, personCard)
    
    lovedOnesSection.append(personCard)
}

function addTitle(lovedOne, personCard){
    const title = document.createElement('h2')
    title.textContent = `${lovedOne.name} - ` + `${lovedOne.relationship}`.charAt(0).toUpperCase() + `${lovedOne.relationship}`.slice(1)
    personCard.append(title)
}

function calculateAge(lovedOne, personCard){
    const today = new Date()
    const bday = new Date(lovedOne.birthday)
    const ageDif = today - bday
    const ageDate = new Date(ageDif)
    const age = Math.abs(ageDate.getUTCFullYear()-1970)
    addAge(age, personCard)
    addSearchButtons(lovedOne, age, personCard)
}

function addAge(age, personCard){
    const ageText = document.createElement('h3')
    ageText.textContent = `Age ${age}`
    personCard.append(ageText)
}

function addSearchButtons(lovedOne, age, personCard){
    const buttonSection = document.createElement('section')
    buttonSection.classList.add('button-section')

    const searchByAgeButton = document.createElement('button')
    searchByAgeButton.classList.add('search-button','btn-primary','btn','btn-block')
    searchByAgeButton.addEventListener('click', (event) => openAgeSearchWindow(event, lovedOne, age))
    searchByAgeButton.innerText = `Gift ideas for ${age}yr olds`
    
    const searchByRelationshipButton = document.createElement('button')
    searchByRelationshipButton.classList.add('search-button','btn-primary','btn','btn-block')
    searchByRelationshipButton.addEventListener('click', (event) => openRelationshipSearchWindow(event, lovedOne))
    searchByRelationshipButton.innerText = `Gift ideas for your `+`${lovedOne.relationship}`.charAt(0).toUpperCase()+`${lovedOne.relationship}`.slice(1)
    
    buttonSection.append(searchByAgeButton, searchByRelationshipButton)
    personCard.append(buttonSection)
}

function openAgeSearchWindow(event, lovedOne, age){
    console.log('clicked search by age button')
    window.open(`https://www.amazon.com/s?k=gifts+for+${age}+year+old+${lovedOne.gender}&ref=nb_sb_noss`, '_blank')
}

function openRelationshipSearchWindow(event, lovedOne){
    console.log('clicked search by relationship button')
    window.open(`https://www.amazon.com/s?k=gifts+for+${lovedOne.relationship}&ref=nb_sb_noss_1`, '_blank')
}

function addExpand(personCard){
    const expand = document.createElement('p')
    expand.classList.add('detail-tag')
    expand.classList.add('text-center')
    expand.innerText = "↕ details ↕"
    personCard.append(expand)
}

function createDetailsCard(lovedOne, personCard){
    const detailPopup = document.createElement('span')
    detailPopup.classList.add('hidden', 'detail-section')
    detailPopup.setAttribute('id', `person-${lovedOne.id}-info`)
    
    createBirthdayElement(detailPopup)
    createGenderElement(detailPopup)
    createAddressElement(detailPopup)
    createInterestSection(detailPopup)
    createUpdateButton(lovedOne, detailPopup)
    addDeleteButton(lovedOne, detailPopup)
    personCard.append(detailPopup)
    personCard.addEventListener('click', event => showDetailsCard(event, lovedOne, detailPopup))
}

function createBirthdayElement(detailPopup){
    const birthday = document.createElement('p')
    birthday.setAttribute('id','birthday')
    detailPopup.append(birthday)
}

function createGenderElement(detailPopup){
    const gender = document.createElement('p')
    gender.setAttribute('id','gender')
    detailPopup.append(gender)
}

function createAddressElement(detailPopup){
    const address = document.createElement('p')
    address.setAttribute('id','address')
    const cityState = document.createElement('p')
    cityState.setAttribute('id','city-state')
    detailPopup.append(address, cityState)
}
function createInterestSection(detailPopup){
    const interestSection = document.createElement('div')
    interestSection.classList.add('interest-section')
    detailPopup.append(interestSection)
}

function showDetailsCard(event, lovedOne, detailPopup){
    console.log(`${lovedOne.name} div clicked`)
    detailPopup.classList.toggle('hidden')
    showBirthday(lovedOne, detailPopup)
    showGender(lovedOne, detailPopup)
    showAddress(lovedOne, detailPopup)

    // showInterests(lovedOne, detailPopup)
}

function addDeleteButton(lovedOne, detailPopup){
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-primary', 'btn-sm', 'delete-button')
    deleteButton.innerText = "delete x"
    detailPopup.append(deleteButton)
    deleteButton.addEventListener('click', event => deleteLovedOne(event, lovedOne))
}

function deleteLovedOne(event, lovedOne){

}

function showBirthday(lovedOne, detailPopup){
    const birthday = detailPopup.querySelector('#birthday')
    birthday.innerText = `Birthday:  ${lovedOne.birthday}`
    detailPopup.append(birthday)
}

function showGender(lovedOne, detailPopup){
    const gender = detailPopup.querySelector('#gender')
    gender.innerText = `Gender:  ${lovedOne.gender}`
    detailPopup.append(gender)
}

function showAddress(lovedOne, detailPopup){
    const address = detailPopup.querySelector('#address')
    const cityState = detailPopup.querySelector('#city-state')

    let address1 = lovedOne.mailing_address1
    if (address1 === null){ address1 = "unknown" }
    
    let address2 = lovedOne.mailing_address2
    if (address2 === ""){ 
        address2 = ""
    }else{
        address2 = `, ${lovedOne.mailing_address2}`
    }

    let city = lovedOne.mailing_city
    let state = lovedOne.mailing_state
    if (state === ""){ state = ""}else{state = `, ${lovedOne.mailing_state} `}

    let zip = lovedOne.mailing_zip

    address.innerText = `Mailing Address: 
    ${address1}${address2}`
    cityState.innerText = `${city}${state}${zip}`
    detailPopup.append(address, cityState)
}

// function showInterests(lovedOne, personCard, detailPopup){
//     lovedOne.interest.forEach(interest => {
        
//     })
// }

    // const interestSection = detailPopup.querySelector('.interest-section')
    // lovedOne.interests.forEach(interest => {
    //     const interestElement = document.createElement('p')
    //     interestElement.textContent = interest.name
    //     interestSection.append(interestElement)
    // })

function createUpdateButton(lovedOne, detailPopup){
    const updateButton = document.createElement('button')
    updateButton.type = 'button'
    updateButton.classList.add('btn-primary','btn','btn-block', 'update-button')
    updateButton.setAttribute("data-toggle", "modal")
    updateButton.setAttribute("data-target","#updateLovedOneInfo")
    updateButton.innerText = "Update Information"
    updateButton.addEventListener('click', event => showUpdateForm(event, lovedOne, detailPopup))
    detailPopup.append(updateButton)
}

function showUpdateForm(event, lovedOne){
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const updateFormTitle = updateForm.querySelector('.form-title')
    updateFormTitle.innerText = `Update ${lovedOne.name}'s Info:`

    const relationshipField = updateForm.querySelector('#relationship-field')
    relationshipField.value = `${lovedOne.relationship}`
    const birthdayField = updateForm.querySelector('#birthday-field')
    birthdayField.value = `${lovedOne.birthday}`
    const genderField = updateForm.querySelector('#gender-field')
    genderField.value = `${lovedOne.gender}`
    const address1Field = updateForm.querySelector('#address1-field')
    address1Field.value = `${lovedOne.mailing_address1}`
    const address2Field = updateForm.querySelector('#address2-field')
    address2Field.value = `${lovedOne.mailing_address2}`
    const cityField = updateForm.querySelector('#city-field')
    cityField.value = `${lovedOne.mailing_city}`
    const stateField = updateForm.querySelector('#state-field')
    stateField.value = `${lovedOne.mailing_state}`
    const zipField = updateForm.querySelector('#zip-field')
    zipField.value = `${lovedOne.mailing_zip}`

    updateForm.classList.remove('hidden')
    addPersonForm.classList.add('hidden')
    updateForm.addEventListener('submit', event => getLovedOneUpdates(event, lovedOne))
}

function getLovedOneUpdates(event, lovedOne){
    event.preventDefault()
    const formData = new FormData(updateForm)
    const id = lovedOne.id
    const name = lovedOne.name
    const relationship = formData.get('relationship')
    const birthday = formData.get('birthday')
    const gender = formData.get('gender')
    const mailing_address1 = formData.get('mailing_address1')
    const mailing_address2 = formData.get('mailing_address2')
    const mailing_city = formData.get('mailing_city')
    const mailing_state = formData.get('mailing_state')
    const mailing_zip = formData.get('mailing_zip')
    const updatedLovedOne = { id, name, relationship, birthday, gender, mailing_address1, mailing_address2, mailing_city, mailing_state, mailing_zip}
    storeUpdates(updatedLovedOne)
}

function storeUpdates(updatedLovedOne){
    fetch(`http://localhost:3000/loved_ones/${updatedLovedOne.id}`, {
        method: "PUT",
        headers: auth_headers, 
        body: JSON.stringify(updatedLovedOne)
    })
    location.reload();
}



