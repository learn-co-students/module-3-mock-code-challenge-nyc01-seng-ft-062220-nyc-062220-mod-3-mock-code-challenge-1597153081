document.addEventListener('DOMContentLoaded', () => {
let dogsUrl = 'http://localhost:3000/dogs/'
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
    dogForm[0].value = `${dogObj.name}`
    dogForm[1].value = `${dogObj.breed}`
    dogForm[2].value = `${dogObj.sex}`

    dogForm.addEventListener("submit", (e)=>{editDog(e, dogObj.id)})
}

const editDog = (e, dogId) => {
    e.preventDefault()
    const dogIndex = parseInt(dogId) - 1
    let editedDog = {}
    editedDog.name = e.target[0].value
    editedDog.breed = e.target[1].value
    editedDog.sex = e.target[2].value
    dogsData[dogIndex] = editedDog

    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(editedDog)
    }
        
    fetch(dogsUrl + dogId, options)
    .then(response => response.json())
    .then(resp => renderDogEdits(resp))
}


const renderDogEdits = (dogObj) => {
    const dogDataRow = document.querySelector(`[data-dog-id='${dogObj.id}']`)
    console.log(dogDataRow.children)
    dogDataRow.children[0].innerText = dogObj.name
    dogDataRow.children[1].innerText = dogObj.breed
    dogDataRow.children[2].innerText = dogObj.sex
}





getDogs()

})