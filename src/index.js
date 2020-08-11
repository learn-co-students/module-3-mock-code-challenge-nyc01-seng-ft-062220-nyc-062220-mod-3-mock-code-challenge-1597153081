document.addEventListener('DOMContentLoaded', () => {
   
    const url = "http://localhost:3000/dogs"
    const table = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')


    const fetchDogs = () => {
        fetch(url)
        .then(response => response.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
    }

    const renderDog = (dog) => {
        const tableRow = document.createElement('tr')
        const dogName = document.createElement('td')
        const dogBreed = document.createElement('td')
        const dogSex = document.createElement('td')
        const dogButton = document.createElement('button')
        dogButton.textContent = "Edit Dog"

        dogName.textContent = dog.name
        dogBreed.textContent = dog.breed 
        dogSex.textContent = dog.sex 
        dogButton.dataset.id = dog.id


        tableRow.append(dogName, dogBreed, dogSex, dogButton)
        table.appendChild(tableRow)
    }

 
    const clickHandler = () => {
        document.addEventListener("click", function(e) {
            if(e.target.textContent === "Edit Dog"){

                const editButton = e.target
                dogForm.name.value = editButton.parentElement.children[0].textContent
                dogForm.breed.value = editButton.parentElement.children[1].textContent
                dogForm.sex.value = editButton.parentElement.children[2].textContent
                dogForm.dataset.id = editButton.dataset.id 
            }
        })
    }

    // On submit of the form, a PATCH request should be made to 
    // http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).


    function submitForm(){
        document.addEventListener("submit", function(e) {
            e.preventDefault()
            
            const name = dogForm.name.value
            const breed = dogForm.breed.value
            const sex = dogForm.sex.value
            const id = dogForm.dataset.id
            const options = {name, breed, sex}
            dogPatch(id, options)
        })
    }

    // Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. 
    // You could search for the table fields you need to edit and update each of them in turn, 
    // but we suggest making a new get request for all dogs and rerendering all of them in the table. 
    // Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

    function dogPatch(id, options) {
        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(options)
        })
        .then(response => response.json())
        updateDog();      //it updates just on page refresh but it does go right to DB to update
            
    }

    function updateDog(dog) {
        const updateName = dogForm.name.value
        const updateBreed = dogForm.breed.value
        const updateSex = dogForm.sex.value
    }
    fetchDogs()
    submitForm()
    clickHandler()

})