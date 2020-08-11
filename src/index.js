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


renderDogs()
})