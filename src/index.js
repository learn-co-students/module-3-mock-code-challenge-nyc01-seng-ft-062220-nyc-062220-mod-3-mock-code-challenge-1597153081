document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs'
    const formParent = document.getElementById("dog-form").parentElement
    const tableBody = document.querySelector("tbody")
    const editForm = formParent.querySelector('#dog-form')
    let allDogs = []

    //api call to grab all dogs
    const fetchDogs = async () => {
        const res = await fetch(URL)
        const data = await res.json()
        data.forEach(dog => {
            allDogs.push(dog)
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
        const data = await res.json()
    }


    //redner each dog onto table 
    const renderDog = (dog) => {
        const tr = document.createElement("tr")
        tr.class = "padding"
        tr.innerHTML = `
              <th class="padding center">${dog.name}</th>
              <th class="padding center">${dog.breed}</th>
              <th class="padding center">${dog.sex}</th>
              <th class="padding center"><button type="button" id=${dog.id}>Edit Dog</button></th>
              `
        tableBody.append(tr)
    }

    //event on-click edit Dog
    const editHandler = () => {
        tableBody.addEventListener('click', e => {
            if(e.target.matches("button")){
                const dogId = e.target.id
                //find the dog obj from list
                const currDog = allDogs.filter(dog => dog.id == dogId)

                //update edit button form view
                editForm.children[0].value = currDog[0].name
                editForm.children[1].value = currDog[0].breed
                editForm.children[2].value = currDog[0].sex
                editForm.children[3].id = currDog[0].id
            }
        })
    }


    //forms submit invoked for above
    const formHandler = () => {
        //eventListener
        editForm.addEventListener('submit', e => {
            e.preventDefault()
            let dogName = editForm.children[0].value
            let dogBreed = editForm.children[1].value
            let dogSex = editForm.children[2].value
            let dogId = editForm.children[3].id
            const dogObj = {
                "name": dogName,
                "breed": dogBreed,
                "sex": dogSex
                }
            editDog(dogId, dogObj)
        })

    }

    //invoke
    fetchDogs()
    editHandler()
    formHandler()
  
})