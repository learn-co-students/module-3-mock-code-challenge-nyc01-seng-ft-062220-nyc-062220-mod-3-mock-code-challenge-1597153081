document.addEventListener('DOMContentLoaded', () => {
const dogsUrl = 'http://localhost:3000/dogs/'
let dogsData = {}
const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")

const getDogs = () => {
    fetch(dogsUrl)
    .then(response => response.json())
    .then(response => {
        dogsData = response
        response.forEach(renderDog)
    })
}

const renderDog = (dogObj) => {
    const dogRow = document.createElement("tr")
    dogRow.dataset.dogId = dogObj.id
    tableBody.append(dogRow)
    const dogName = document.createElement("td")
    const dogBreed = document.createElement("td")
    const dogSex = document.createElement("td")
    const editButtonContainerTd = document.createElement("td")
    const editButton = document.createElement("button")
    dogName.innerHTML = `${dogObj.name}`
    dogBreed.innerHTML = `${dogObj.breed}`
    dogSex.innerHTML = `${dogObj.sex}`
    editButton.innerText = `Edit`
    editButton.addEventListener("click", grabDog)
    editButtonContainerTd.append(editButton)
    dogRow.append(dogName, dogBreed, dogSex, editButtonContainerTd)
}

const grabDog = (e) => {
    const tableRow = e.target.parentElement.parentElement
    const dogId = tableRow.dataset.dogId
    const dogIndex = parseInt(dogId) - 1
    const dogToEdit = dogsData[dogIndex]
    
    populateEditForm(dogToEdit)
}

const populateEditForm = (dogObj) => {
    
}




getDogs()

})