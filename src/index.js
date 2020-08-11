/*
PLAN
    - DONE Get rrequest - fetch dogs from DB
        DONE- locate table
        DONE - render dogs to DOM (in table)
            DONE - helper functions for rendering 
    - DONE Add event listener to edit buttons (event delegetion)
          DONE  - fetch a single dog! + populate form values
             DONE - click should populate form with current dog info
          DONE - changing info + submit event triggers PATCH to DB
        - render edited DOG info pessamistically to DOM
            - easiest way is new get request for all dogfs and rerendering whole table
            - GET AFTER PATCH
NOTE: got to last step super fast - then went down a wrong path with my ID for my patch request and got stuck for like anhour :(

*/


document.addEventListener('DOMContentLoaded', () => {
    console.log("dom loaded")
    const editForm = document.getElementById("dog-form")
    const tableBody = document.getElementById("table-body")
    const url = "http://localhost:3000/dogs/" 

    function getDogs() {
        fetch(url)
        .then(response => response.json())
        .then(dogObjs => {renderDogs(dogObjs)})
    }

    function renderOneDog(dogObj) {
        const dogName = dogObj.name
        const dogBreed = dogObj.breed
        const dogSex = dogObj.sex
        const dogId = dogObj.id
        
        const newRow = document.createElement("tr")
        newRow.innerHTML = `
        <tr>
            <td>${dogName}</td> 
            <td>${dogBreed}</td> 
            <td>${dogSex}</td>
            <td><button data-id=${dogId} >Edit</button></td>
        </tr>
        `

        tableBody.append(newRow)

    }

    function renderDogs(dogObjs) {
        dogObjs.forEach(renderOneDog)
    }

    document.addEventListener("click", function(e) {
        if(e.target.matches("button")) {
            const clickedDogId = parseInt(e.target.dataset.id)
            fetch(url + clickedDogId)
            .then(response => response.json())
            .then(dogToEdit => {
                const dogNameVal = dogToEdit.name
                const dogBreedVal = dogToEdit.breed
                const dogSexVal = dogToEdit.sex
                editForm.innerHTML = `
                <input type="text" name="name" placeholder="dog's name" value="${dogNameVal}" />
                <input type="text" name="breed" placeholder="dog's breed" value="${dogBreedVal}" />
                <input type="text" name="sex" placeholder="dog's sex" value="${dogSexVal}" />
                <input type="submit" value="Submit" data-id=${clickedDogId} />
                `
            })   
        }   
    })

    editForm.addEventListener("submit", function(e){
        e.preventDefault()
        
        const submitButton = document.querySelector("button")
        const clickedDogId = submitButton.dataset.id
        
        const newName = editForm.name.value
        const newBreed = editForm.breed.value
        const newSex = editForm.sex.value

        configObj = {
            method:"PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({
                name: newName,
                breed: newBreed,
                sex: newSex
            })

        }
        
        fetch(url + clickedDogId, configObj)
        .then(response => response.json())
        .then(editedDog => {
            getDogs()
            editForm.innerHTML = `
        <input type="text" name="name" placeholder="dog's name" value="" />
        <input type="text" name="breed" placeholder="dog's breed" value="" />
        <input type="text" name="sex" placeholder="dog's sex" value="" />
        <input type="submit" value="Submit" />
        `
        })
        
        
        

    })


    getDogs()
})