document.addEventListener('DOMContentLoaded', () => {
    dogURL = "http://localhost:3000/dogs/"
    const dogForm = document.querySelector('#dog-form')
    const tableBody = document.querySelector('#table-body')

//Getting dogs
    function getDogs() {
        fetch(dogURL)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    }
//RenderDogs  
    function renderDogs(dogs) {
        dogs.forEach(dog => renderDog(dog))
        
    }
//RenderDog onto Rows and then Body 
    function renderDog(dog) {
        // debugger
        const tr = document.createElement('tr')
        tr.dataset.id = dog.id
        tr.innerHTML = `
        <td class="name">${dog.name}</td>
        <td class="breed">${dog.breed}</td>
        <td class="sex">${dog.sex}</td>
        <td><button class="edit">Edit</button></td>
        `
        tableBody.append(tr)
    }

//clickHandler for edit button
    document.addEventListener('click', e => {
        if(e.target.matches(".edit")) {
            let editDog = e.target
            let buttonTd = editDog.parentElement
            let tr = buttonTd.parentElement
            updateDetails(tr)
        }
    })

    //updating Details
    function updateDetails(tr) {
        let name = tr.querySelector('.name')
        let breed = tr.querySelector('.breed')
        let sex = tr.querySelector('.sex')
        let id = tr.datasetId
    //Populating the Form 
        dogForm.innerHTML = `
        <input type="text" name="name" placeholder="dog's name" value="${name.innerText}" />
        <input type="text" name="breed" placeholder="dog's breed" value="${breed.innerText}" />
        <input type="text" name="sex" placeholder="dog's sex" value="${sex.innerText}" />
        <input type="submit" value="Submit" />
    `   
    let newName = dogForm.name.value 
    let newBreed = dogForm.breed.value 
    let newSex = dogForm.sex.value

    dogObj = (newName)

        let option = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify {newName, newBreed, newSex}
        }
        document.addEventListener('submit', event => {
            event.target.preventDefault
            fetch(dogURL+`${id}`, option)
            .then(resp => resp.json())
            .then(data => renderDog(data))
        })
    }
    
   


getDogs()

})



/*

Make dog editable... click event for edit button 
√populate form with current information
on submit PATCH 

- On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

- Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

get dogs and have them appear inside of the table... 
√fetch dogs 
√render dogs and on eech render: 
√create a table row <tr></tr> for each <td></td> dog with: 
*/