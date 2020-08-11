document.addEventListener('DOMContentLoaded', () => {


const getDogs = () => {
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogCollection => console.log(dogCollection))
}



const table = document.querySelector("table")
const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>name</td> <td>breed</td> <td>sex</td> <td><button>Edit</button></td>`
table.append(tr)


const button = document.querySelector("button")
button.addEventListener("click", function(e){
    console.log("click")
    }
)


// renderDog()
getDogs()
})


// - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

{/* <td>name ${dogObj.name}</td> <td>breed ${dogObj.breed}</td> <td>sex ${dogObj.sex}</td> <td><button>Edit</button></td> */}