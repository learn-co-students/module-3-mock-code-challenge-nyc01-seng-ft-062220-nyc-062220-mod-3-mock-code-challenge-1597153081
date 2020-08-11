document.addEventListener('DOMContentLoaded', () => {
    //declare global variables
    const URL = 'http://localhost:3000/dogs'
    const formParent = document.getElementById("dog-form").parentElement
    const tableBody = document.querySelector("tbody")
    const editForm = formParent.querySelector('#dog-form')
    //create empty array, allDogs will be added during function fetchDogs
    let allDogs = []

    //api call to grab all dogs
    const fetchDogs = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        data.forEach(dog => {
            //for each dog in data add objs to allDogs
            allDogs.push(dog)
            //render each dog to the tableBody
            renderDog(dog)
        })
    }

    //api call to edit dog
    const editDog = async (id, dogObj) => {
        const settings = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dogObj)
        }
        const res = await fetch(`${URL}/${id}`, settings)
    }


    //render each dog onto table
    const renderDog = (dog) => {
        //create a new table row
        const tr = document.createElement("tr")
        tr.class = "padding"
        tr.innerHTML = `
              <th class="padding center">${dog.name}</th>
              <th class="padding center">${dog.breed}</th>
              <th class="padding center">${dog.sex}</th>
              <th class="padding center"><button type="button" id=${dog.id}>Edit Dog</button></th>
              `
        //add the new created table row onto the tableBody
        tableBody.append(tr)
    }

    //event on-click edit Dog
    const editHandler = () => {
        tableBody.addEventListener('click', e => {
            //listen for click on button ONLY for tableBody
            if(e.target.matches("button")){
                //e.target will always be button thus set that button id to dogId
                const dogId = e.target.id
                //find the dog obj from list
                const currDog = allDogs.filter(dog => dog.id == dogId)
                //update edit button form view
                //taking advantage of children nodes! editForm is the partner that has all the values we need
                editForm.children[0].value = currDog[0].name
                editForm.children[1].value = currDog[0].breed
                editForm.children[2].value = currDog[0].sex
                editForm.children[3].id = currDog[0].id

                //after this point- on edit button click, the form should be pre-populated.
            }
        })
    }


    //forms submit invoked for above
    const formHandler = () => {
        //eventListener on editForm since, we only care about clicks on the submit form
        editForm.addEventListener('submit', e => {
            e.preventDefault()
            //using editForm grab each children's value
            let dogName = editForm.children[0].value
            let dogBreed = editForm.children[1].value
            let dogSex = editForm.children[2].value
            let dogId = editForm.children[3].id
            //create updated dog object for patch
            const dogObj = {
                "name": dogName,
                "breed": dogBreed,
                "sex": dogSex
                }

            //invoke patch update 
            //extra condition if the dog name is empty
            !dogObj.name ? alert('Invalid Entry!') : editDog(dogId, dogObj)

        })

    }

    //invoke functions!
    fetchDogs()
    editHandler()
    formHandler()
  
})