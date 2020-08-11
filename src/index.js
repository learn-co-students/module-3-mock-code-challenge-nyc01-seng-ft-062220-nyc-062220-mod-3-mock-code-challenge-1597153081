document.addEventListener('DOMContentLoaded', () => {
const URL = "http://localhost:3000/dogs/"

    function renderDogs() {
        fetch(URL)
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => addDog(dog)))
    }

    function addDog(dog) {
        const table = document.querySelector("tbody")
        const dogRow = document.createElement("tr")

        dogRow.dataset.id = dog.id
        dogRow.classList.add("dog")

        dogRow.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td>
        `

        table.append(dogRow)
    }


    function clickHandler() {
        document.addEventListener("click", function(event) {
            if (event.target.textContent === "Edit") {
                let button = event.target
                fetchDog(button)
            }
        })

        document.addEventListener("submit", function(event) {
            event.preventDefault()
            let submitEdits = event.target

            console.log(submitEdits)
        })
    }



    function fetchDog(button) {
        const dogRow = button.parentElement.parentElement
        const dogId = dogRow.dataset.id
        
        fetch(URL + dogId)
        .then(res => res.json())
        .then(dog => showDog(dog))
    }


    function showDog(dog) {
        const nameField = document.querySelector("input[name]")
        const breedField = document.querySelector(`input[name="breed"]`)
        const sexField = document.querySelector(`input[name="sex"]`)
        const form = nameField.parentElement
        form.dataset.id = dog.id
        
        nameField.value = dog.name
        breedField.value = dog.breed
        sexField.value = dog.sex
    }


clickHandler()
renderDogs()
})