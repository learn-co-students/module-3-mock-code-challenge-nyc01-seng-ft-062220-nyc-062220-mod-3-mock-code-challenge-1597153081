// √ On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

// √ The dog should be put on the table as a table row. The HTML might look something like this <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>


// √ Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.


// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).


// Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

const DOGS_URL = 'http://localhost:3000/dogs/'
let currentDog;
let currentDogCollection;


document.addEventListener('DOMContentLoaded', () => {



    fetchDogs=()=>{
        fetch(DOGS_URL)
            .then(resp => resp.json())
            .then(dogCollection => {parseDogs(dogCollection)})
    }
    
    parseDogs=(dogCollection)=>{
        for (const dog of dogCollection) {
            renderDog(dog)
            currentDogCollection = dogCollection;

        }
    }
    
    renderDog=(dog)=>{
    
        let dogTableBody = document.getElementById('table-body');
    
        let dogTable = document.createElement('tr'),
            dogNameText = document.createElement('td'),
            dogBreedText = document.createElement('td'),
            dogSexText = document.createElement('td'),
            dogEditBtn = document.createElement('button');
    
            // dogEditBtn.type = 'button'
    
            dogNameText.innerHTML = dog.name
            dogBreedText.innerHTML = dog.breed
            dogSexText.innerHTML = dog.sex
            dogEditBtn.innerHTML = "Edit Dog"
            dogEditBtn.id = 'edit-dog'
            dogEditBtn.dataset.dogId = dog.id
    
            dogTableBody.appendChild(dogTable)
            dogTableBody.appendChild(dogNameText)
            dogTableBody.appendChild(dogBreedText)
            dogTableBody.appendChild(dogSexText)
            dogTableBody.appendChild(dogEditBtn)
    
        
    }
clickhandler=()=>{
    document.addEventListener('click', function(e) {
        if (e.target.id === 'edit-dog'){
            let dogId = e.target.dataset.dogId
            editAction(dogId)
        }
        })
    }

    editAction=(dogId)=>{
        
        for (const dog of currentDogCollection) {
            if (dogId == dog.id) {
                let formDogName = document.getElementById("form-name"),
                formDogBreed = document.getElementById("form-breed"),
                formDogSex = document.getElementById("form-sex");
    
                formDogName.value = dog.name,
                formDogBreed.value = dog.breed,
                formDogSex.value = dog.sex

                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    'body': JSON.stringify(
                        { "name": formDogName.value}
   
                        )
                }
            
                fetch(DOGS_URL+dogId, options)
                    .then(resp => resp.json())
                    .then(resp => console.log(resp))
            }
        }



    }

    fetchDogs()
    clickhandler()



});