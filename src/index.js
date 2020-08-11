document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(renderDogs)
    })
//make table rows  with dogInfo and use innerHTML to add in button
    const renderDogs = (dogs) => {
        let table = document.getElementById('table-body')
        // dogs.dataSet.DogsId = dogs.id
        row = table.insertRow(dogs.length)
        row.id = dogs.id 
        row.innerText = dogs.name
        cellBreed = row.insertCell(0)
        cellSex = row.insertCell(1)
        cellEdit = row.insertCell(2)
        cellBreed.innerText = dogs.breed
        cellSex.innerText = dogs.sex 
        cellEdit.innerHTML = `
        <button>Edit</button>
        `
        
        }

        //edit dogs by creating a click event and using the id set from the table 
        //create a submit handler to grab Dog attribute Objects then put it into the PATCH
        const dogSubmitHand = () => {
            document.addEventListener('submit', (event)=> {

                const form = getElementById('dog-form')
                form = event.target

                event.preventDefault()
                let name = event.target.name.value
                let breed = event.target.breed.value
                let sex = event.target.sex.value


                const dogObj = {
                    name: name,
                    breed: breed,
                    sex: sex

                }

                postDogs(dogObj)
                
            })
        }

        const postDogs = () => {
            const options = {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(dogObj)
            }
            fetch(`http://localhost:3000/dogs/${dogs.id}`, options)
            .then(response => response.json())
            .then(dogs => 
                renderDogs(dogs))
        }
        
        dogSubmitHand()
    })


