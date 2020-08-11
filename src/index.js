const url = "http://localhost:3000/dogs/"

document.addEventListener("DOMContentLoaded", e => {

    const getDogs = () => {
        fetch(url)
            .then(res => res.json())
            .then(dogs => dogs.forEach(dog => addDog(dog)))
    }

    const addDog = (dog) => {
        const dogContainer = document.getElementById("table-body")
        const dogRow = document.createElement('tr')
        dogRow.dataset.id = dog.id
        dogRow.classList.add("dog")
        dogRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <button>edit</button>
        `
        dogContainer.append(dogRow)
    }

    const clickHandler = () => {
        document.addEventListener("click", e =>{
            if(e.target.textContent === "edit") {
                let button = e.target
                fetchDog(button)
            }
        })

        document.addEventListener("submit", e => {
            let values = e.target
            let dogId = values.dataset.id
            patchDog(e, values, dogId)
        })
    }

    const fetchDog = (button) => {
        const dogRow = button.parentElement
        const dogId = dogRow.dataset.id

        fetch(url + dogId)
            .then(res => res.json())
            .then(dog => showDog(dog))
    }

    const showDog = (dog) => {
        const nameField = document.querySelector(`input[name= "name"]`)
        const breedField = document.querySelector(`input[name= "breed"]`)
        const sexField = document.querySelector(`input[name= "sex"]`)
        const form = nameField.parentElement
        form.dataset.id = dog.id
        nameField.value = dog.name
        breedField.value = dog.breed
        sexField.value = dog.sex
    }

    const patchDog = (e, values, dogId) => {
        const nameField = document.querySelector(`input[name= "name"]`)
        const breedField = document.querySelector(`input[name= "breed"]`)
        const sexField = document.querySelector(`input[name= "sex"]`)

        const updatedInfo = {
            name: nameField.value,
            breed: breedField.value,
            sex: sexField.value
        }

        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(updatedInfo)
        }

        fetch(url + dogId, packet)
            .then(res =>res.json())
            .then(values.reset())



    }

    getDogs()
    clickHandler()
})