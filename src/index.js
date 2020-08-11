document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    const dogsShowPage = "http://localhost:3000/dogs/${dogID}"

//fetch dogs from database

    function getDogs(){
        fetch(dogsUrl)  
        .then(response => response.json())
        .then(dogCollection => dogCollection.forEach(dog => renderDog(dog)))
      }

// 2) create dogCard with innerHTML
    function renderDog(dog){  //NOT RENDERING
        const dogParent = document.querySelector("body > div > div:nth-child(3) > table > thead")
        const dogtr = document.createElement("tr")
        dogtr.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>*${dog.sex}*</td> <td><button>Edit</button></td>`
        dogtr.insertAdjacentElement("afterend", dogParent);
        // console.log(dogtr)
        // console.log(dogtr);
        // const dogName = document.querySelector("body > div > div:nth-child(3) > h4")
        // const dogNametd = document.createElement("tr")
        // dogNametd.innerText = `${dog.name}`
        // dogCard.innerHTML = `td>${dog.name}</td>`
        // dogCard.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>*${dog.sex}*</td> <td><button>Edit</button></td>`
        // console.log(dogCard)
        // dogName.append(dogNametd)
        dogParent.append(dogtr)

// 3) create listener for submit
    function submitHandler() {
          

        document.addEventListener("click", e => {
        const submitBtn = document.querySelector("#dog-form > input[type=submit]:nth-child(4)")
        submitBtn = e.target
        })

        document.addEventListener("submit", e => {
            e.preventDefault()

            e.target
            //create a variable for the form and assign it to the event
            const newDog = document.querySelector("#dog-form")
            function updateDogs {
              
                const dogObj = {
                    name:
                    breed:
                    sex: 
                }

                const dogConfig = {
                        method: "PATCH",
                        headers: {
                          "content-type": "application/json",
                          "accept": "application/json"
                        },
                        body: JSON.stringify(dogObj)
            }
                fetch(dogsShowPage, dogConfig)
                .then(response => response.json())
                .then(dog => dog)
              }
            }
        
        )
    })
        // renderDog(dog)




//patch/update MUST BE AFTER GET!



//invoke methods-----------------------------------------------------------
getDogs()


})


/*
1) Fetch dogs from db.json
2) create dogCard with innerHTML
<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>


*/