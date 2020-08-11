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


        data.forEach(dog => {

            const dogCard = document.createElement('tr')
            const dogName = dog.name
            const dogBreed = dog.breed
            const dogSex = dog.sex

            dogCard.innerHTML = `
                <td>${dogName}</td> <td>${dogBreed}</td> <td>${dogSex}</td> <td><button>Edit</button></td>
            `

            dogBookShelf.append(dogCard)

        })



    }


    getDogList()

})