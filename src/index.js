document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs'
    const formId = document.getElementById("dog-form")
    const formParent = document.getElementsByClassName("main flex")
    const tableBody = document.querySelector("tbody")
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

    //event on-click 


    //forms submit
    const formHandler = () => {
        formParent.querySelector('padding margin')
        console.log(formParent)

    }

    //invoke
    fetchDogs()
    formHandler()
})