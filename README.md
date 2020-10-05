# Gift Giver

An app to help you be the best Gift Giver out there - on top of all of your loved ones brithdays, changing interests and getting gifts there on time!

# Table Of Contents 
- [Description](https://github.com/sbrook13/Gift-Giver-Frontend#description)
- [How It Works (gifs)](https://github.com/sbrook13/Gift-Giver-Frontend#how-it-works)
- [Example Code](https://github.com/sbrook13/Gift-Giver-Frontend#example-code)
- [Technology Used](https://github.com/sbrook13/Gift-Giver-Frontend#technology-used)
- [Setting up for the Application](https://github.com/sbrook13/Gift-Giver-Frontend#setting-up-for-the-application)
- [Main Features](https://github.com/sbrook13/Gift-Giver-Frontend#main-features)
- [Features in Progress](https://github.com/sbrook13/Gift-Giver-Frontend#features-in-progress)
- [Contact Information](https://github.com/sbrook13/Gift-Giver-Frontend#contact-information)
- [Link to Backend Repo](https://github.com/sbrook13/Gift-Giver-Frontend#link-to-backend-repo)

## Description

Gift Giver is a web application that allows a logged in user to record loved ones birthdays, interests, and mailing addresses. Your stored information is secured by tokens and authentication on the backend. Search for suggested gifts based on age and relationship to you (i.e. Mom) with the click of a button! Add the person's current interests, remove old interests, update their address or other information, and remove them from your list when needed. 

## How It Works

### Create New User or Login


![Create User](https://media.giphy.com/media/5lLpKmJnUIz8jcpRjp/giphy.gif)


### Add a Loved One


![New Loved One](https://media.giphy.com/media/y6Ifdf7GJcOKTRHrsj/giphy.gif)


### See Gift Suggestions Based on Age or Relationship


![Gift Suggestions](https://media.giphy.com/media/xvVYR6GgRNm3x18CB4/giphy.gif)


### Update Loved One's Information


![Update](https://media.giphy.com/media/A7ZrmmFxF62nSrC4QS/giphy.gif)


### See and Add Interests


![Interests](https://media.giphy.com/media/xiDaBakzMQ9PgxP7r9/giphy.gif)


### Remove Loved One From Your List


![Delete](https://media.giphy.com/media/NX0UeSIV2YDEwYNxbb/giphy.gif)

### Logout


![Logout](https://media.giphy.com/media/dT7JUSh6ON67NVyh9V/giphy.gif)



## Example Code 

```
function showAddForm(){
    interestSection.classList.add('hidden')
    addPersonForm.classList.toggle('hidden')
    updateForm.classList.add('hidden')
}

const addPersonForm = document.querySelector('#new-person-form')
addPersonForm.addEventListener('submit', getPersonInfo);

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
    addPersonForm.reset()
    persistPerson(lovedOne)
}
```

```
function calculateAge(lovedOne, personCard){
    const today = new Date()
    const bday = new Date(lovedOne.birthday)
    const ageDif = today - bday
    const ageDate = new Date(ageDif)
    const age = Math.abs(ageDate.getUTCFullYear()-1970)
    addAge(age, personCard)
    addSearchButtons(lovedOne, age, personCard)
}
```

```
function logoutUser(){
    localStorage.clear()
    window.location.href = '/'
}
```

## Technology Used

- Javascript
- HTML
- CSS

## Setting up for the application

To start the server run

``` 
    lite-server 
```

## Main Features

- User can sign up/sign in with authentication.
- User can add a loved one's name, relationship, birthday, gender, interests and mailing address.
- User can update loved one's information, and remove them.

## Features in Progress

- Saving gift ideas to the loved one's note. 
- Integrating with SendGrid for automated email notifications. 

## Contact Information

Created by [Shelley Brook](https://www.linkedin.com/in/sbrook13/)

## Link to Backend Repo

https://github.com/sbrook13/Gift_Giver_Backend
