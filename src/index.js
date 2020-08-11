DOG_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {

    const table = document.querySelector("#table-body")
    const editForm = document.querySelector("#dog-form")

    const getDogs = () => {
        // clearEditFormId()
        fetch(DOG_URL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = (dogs) => {
        for (const dog of dogs) {
            renderDog(dog)
        }
    }

    const renderDog = (dog) => {
            const newTr = document.createElement("tr")
            newTr.dataset.tableId = dog.id
            const newTd1 = document.createElement("td")
            const newTd2 = document.createElement("td")
            const newTd3 = document.createElement("td")
            const newTd4 = document.createElement("td")
            newTd1.innerText = dog.name
            newTd2.innerText = dog.breed
            newTd3.innerText = dog.sex
            const newButton = document.createElement("button")
            newButton.innerText = "Edit"
            newButton.className = "edit"
            newTd4.append(newButton)
            newTr.append(newTd1)
            newTr.append(newTd2)
            newTr.append(newTd3)
            newTr.append(newTd4)
            table.append(newTr)
    }

    const retrieveDog = (button) => {
        return button.parentNode.parentNode
    }

    const populatePlaceholders = (dog) => {
        const dogFields = editForm.querySelectorAll("input")
        const dogAttributes = dog.querySelectorAll("td")
        dogFields[0].setAttribute("placeholder", dogAttributes[0].innerText)
        dogFields[1].setAttribute("placeholder", dogAttributes[1].innerText)
        dogFields[2].setAttribute("placeholder", dogAttributes[2].innerText)
    }

    const setEditFormId = (dog) => {
        editForm.dataset.dogId = dog.dataset.tableId
    }

    const clearEditFormId = () => {
        editForm.dataset.dogId = 0
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e) {
            const button = e.target
            if (button.matches("button.edit")) {
                const dog = retrieveDog(button)
                populatePlaceholders(dog)
                setEditFormId(dog)
            }
        })
    }

    const updateDogInfo = (dogRow,dog) => {
        const dogFields = dogRow.querySelectorAll("td")
        dogFields[0].innerText = dog.name
        dogFields[1].innerText = dog.breed
        dogFields[2].innerText = dog.sex
    }

    const updateDog = (dog) => {
        const rows = table.querySelectorAll("tr")
        for (const row of rows) {
            if (editForm.dataset.dogId === row.dataset.tableId) {
                updateDogInfo(row,dog)
            }
        }
    }

    const clearPlaceHolders = () => {
        const dogFields = editForm.querySelectorAll("input")
        dogFields[0].value = ""
        dogFields[1].value = ""
        dogFields[2].value = ""
        // dogFields[0].setAttribute("placeholder", "dog's name")
        // dogFields[1].setAttribute("placeholder", "dog's breed")
        // dogFields[2].setAttribute("placeholder", "dog's sex")
    }

    const submitHandler = () => {
        document.addEventListener("submit", function(e) {
            const submittedForm = e.target
            if (submittedForm.matches("#dog-form")) {
                e.preventDefault()
                if (editForm.dataset.dogId !== "0") {
                    const dogObj = {
                        name: submittedForm.name.value,
                        breed: submittedForm.breed.value,
                        sex: submittedForm.sex.value
                    }

                    const configObj = {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(dogObj)
                    }
                    fetch(DOG_URL + editForm.dataset.dogId,configObj)
                    .then(response => response.json())
                    .then(dog => updateDog(dog))
                    // .then(clearEditFormId())
                    .then(clearPlaceHolders())
                    .then(getDogs())
                    .catch(error => console.log(error))
                }
            } 
        })
    }

    getDogs()
    clickHandler()
    submitHandler()
    clearEditFormId()
})