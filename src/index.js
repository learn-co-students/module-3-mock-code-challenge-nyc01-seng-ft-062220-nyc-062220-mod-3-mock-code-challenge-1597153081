document.addEventListener('DOMContentLoaded', () => {
    
    let dog_link = "http://localhost:3000/dogs/"
    let tbody = document.getElementById("table-body")

    fetch(dog_link)
    .then(resp=>resp.json())
    .then(dogs => dogs.forEach(renderDogs))

    function renderDogs(dog){
        tbody.innerHTML += `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr> `
    }

    function editDog(){

        tbody.addEventListener("click", e=>{
            let form = document.getElementById("dog-form")

            let dogId = e.target.dataset.id
            
            let dogName = e.target.parentNode.parentNode.children[0].innerText
            let dogBreed = e.target.parentNode.parentNode.children[1].innerText
            let dogSex = e.target.parentNode.parentNode.children[2].innerText
            
            form.name.value = dogName
            form.breed.value = dogBreed
            form.sex.value = dogSex
            
            form.addEventListener("submit", e=>{
             
                e.preventDefault()

                let updatedName = form.name.value
                let updatedBreed = form.breed.value
                let updatedSex = form.sex.value

                let updatedDog ={
                    name: updatedName,
                    breed: updatedBreed,
                    sex: updatedSex
                }
                let options = {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedDog)
                }
                fetch(dog_link+dogId, options)
                .then(  

                    fetch(dog_link)
                    .then(resp => resp.json())
                    // .then(console.log)
                    .then(dogs => {
                        
                        let tbody = document.getElementById("table-body")
                        let form = document.getElementById("dog-form")
                        tbody.innerHTML=""
                        form.name.value=""
                        form.breed.value=""
                        form.sex.value=""
                        dogs.forEach(renderDogs)}
                        )                  
                    )            

            }) //formEventListener        
        })//clickEventListener
    }//editDog
    
    editDog()


})