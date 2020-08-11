document.addEventListener('DOMContentLoaded', () => {
const URL = 'http://localhost:3000/dogs/'


    function clickHandler(){
        document.addEventListener('click', e => {
            if(e.target.matches("#table-body > tr > td> button")){
                updateDoggosForm(e.target)
            }
        });
        
       
    }

    function updateDoggosForm(dogInfo){
        const form = document.querySelector("#dog-form")
        const dogID = dogInfo.dataset.id
        fetch(URL+dogID)
        .then(res => res.json())
        .then(dog => {
            form.innerHTML =
        `<form id='dog-form' class="padding margin border-round border-grey">
          <input type="text" name="name" placeholder="dog's name" value="${dog.name}" />
          <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}" />
          <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}" />
          <input type="submit" value="Submit" />
        </form>`
        })
        
        document.addEventListener("submit", e => {
            updateDoggo(e.target, dogID)        
        });
    }

    function updateDoggo(dogInfo, dogID){

        const dogName = dogInfo[0].value
        const dogBreed = dogInfo[1].value
        const dogSex = dogInfo[2].value

        let configObject = {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: dogName,
                breed: dogBreed,
                sex: dogSex
            })
        };   
    fetch(URL+dogID, configObject)

    }

    function getDoggos() {
        fetch(URL)
        .then(res => res.json())
        .then(dogs => renderDoggos(dogs))
    }



    function renderDoggos(dogs) {
        dogs.forEach(dog => {
            createTableRow(dog)
        })
    }

 

    function createTableRow(dog){
        const table = document.querySelector("#table-body")
        const row = table.insertRow(0)
        const name = row.insertCell(0)
        const breed = row.insertCell(1)
        const sex = row.insertCell(2)
        const editButton = row.insertCell(3)
            name.innerHTML = `${dog.name}`
            breed.innerHTML = `${dog.breed}`
            sex.innerHTML = `${dog.sex}`
            editButton.innerHTML = `<button data-id="${dog.id}">Edit</button>`
    }



    clickHandler()
    getDoggos()

})//DomContentLoaded

//PsuedoCody
// Deliverable 1
// √1. Create a Fetch function
// √2. Create a function to loop through and render the dogs
// 
// Deliverable 2
// √1. Create a function to update each table roe (googled)
//
// Deliverable 3
// √1. Create an event listener for the edit button with event delegation
// √2. Populate top form to submit changes
// 3. Create a patch request to update that dogs informaiton
//