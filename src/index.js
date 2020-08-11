document.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById("table-body")
    const dogForm = document.getElementById("dog-form")
    
    loadDogs()

    table.addEventListener("click", function(e){
        
        if(e.target.tagName === "BUTTON"){
            let dog = e.target.parentNode.parentNode,
            name = dog.querySelector(".name").textContent,
            breed = dog.querySelector(".breed").textContent,
            sex = dog.querySelector(".sex").textContent,
            id = e.target.dataset.id;

            fillEditForm(name,breed,sex,id)
        }
        //the end of the table click addEventListenenr
    })

    dogForm.addEventListener("submit",function(e){
        e.preventDefault()
        const body = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        const options = {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`,options)
        .then(function(response){ return response.json()})
        .then(function(dog){ updateDog(dog)})

        // i made it so it just updates the row with the info once the patch has happened. but if they want a refresh on the whole page just
        //write table.innerHTML = ""
        //then loadup loadDogs()
        // the end of the dogForm click addeventlistener
    })




    function loadDogs(){

        fetch("http://localhost:3000/dogs")
        .then(function(response){ return response.json()})
        .then(function(dogs){
            dogs.forEach(dog => displayDogs(dog))
        })
    }


    function displayDogs(dog){
        const row = document.createElement("tr")
        row.innerHTML =  `<td class ="name">${dog.name}</td>
            <td class= "breed">${dog.breed}</td> 
            <td class ="sex">${dog.sex}</td> 
            <td><button>Edit</button></td>`
        const button = row.querySelector("button")
        button.dataset.id = dog.id
        table.appendChild(row)
    }

    function fillEditForm(name,breed,sex,id){
        dogForm.name.value = name
        dogForm.breed.value = breed
        dogForm.sex.value = sex
        dogForm.dataset.id = id
    }

    function updateDog(dog){
    const dogRow = table.querySelector(`[data-id = "${dog.id}"]`).parentNode.parentNode

    dogRow.querySelector(".name").textContent = dog.name
    dogRow.querySelector(".breed").textContent = dog.breed
     dogRow.querySelector(".sex").textContent = dog.sex
}
// this is the end of the DomContentLoaded event listener
})