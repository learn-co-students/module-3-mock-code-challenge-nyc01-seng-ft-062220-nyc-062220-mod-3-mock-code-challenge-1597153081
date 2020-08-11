// DONE - render dogs to tr <td>
// make dog editable
//be able to update dog
//render dogs pessimistically
const url = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {

    const getDogList = () => {

        fetch(url)
            .then(res => res.json())
            .then(data => loadDogData(data))
    }

    const loadDogData = (data) => {
        //iterate through data to grab dog objects
        const dogBookShelf = document.getElementById("table-body")
        while (dogBookShelf.firstChild) {
            dogBookShelf.removeChild(dogBookShelf.lastChild)
        }


        data.forEach(dog => {
            const dogCard = document.createElement('tr')
            const dogName = dog.name
            const dogBreed = dog.breed
            const dogSex = dog.sex

            dogCard.innerHTML = `
                <td>${dogName}</td> <td>${dogBreed}</td> <td>${dogSex}</td> <td><button>Edit</button></td>
            `
            dogCard.dataset.id = dog.id
            dogBookShelf.append(dogCard)
        })
    }

    const editDog = () => {

        // DONE - grab id
        // DONE - pull dog
        // DONE - populate form
        //grab new data


        document.addEventListener("click", e => {
            e.preventDefault()

            if (e.target.matches("button")){

                const dogForm = document.getElementById("dog-form")
                const button = e.target
                const buttonParent = button.parentElement
                const buttonGrandParent = buttonParent.parentElement
                const dogId = buttonGrandParent.dataset.id

                fetch(url + dogId)
                    .then(res => res.json())
                    .then(data => {
                        const dogName = data.name
                        const dogBreed = data.breed
                        const dogSex = data.sex

                        const newForm = `                   
                        <input type="text" name="name" placeholder="dog's name" value="${dogName}">
                        <input type="text" name="breed" placeholder="dog's breed" value="${dogBreed}">
                        <input type="text" name="sex" placeholder="dog's sex" value="${dogSex}">
                        <input type="submit" value="Submit" id="submit-button" />                     
                        `
                        dogForm.innerHTML = newForm

                        updateDog(dogId)

                    })
            }
        })
    }

    const updateDog = (dogId) => {



        document.addEventListener("click", e => {

            if(e.target.matches("input#submit-button")) {

                const button = e.target
                const dogForm = button.parentElement

                const newDogName = dogForm.name.value
                const newDogBreed = dogForm.breed.value
                const newDogSex = dogForm.sex.value

                const dog = {
                    name: newDogName,
                    breed: newDogBreed,
                    newDogSex: newDogSex
                }

                const packet = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },

                    body: JSON.stringify(dog)
                }


                fetch(url + dogId, packet)
                    .then(res => res.json())

                getDogList()
            }




        })
    }


    editDog()
    getDogList()


})

