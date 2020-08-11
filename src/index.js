document.addEventListener('DOMContentLoaded', () => {renderDogs() 

    let table = document.querySelector(".margin")
    let  tableRow = document.querySelector("table")
    let form = document.querySelector("#dog-form")
   

    function renderDogs() {
      fetch("http://localhost:3000/dogs")
      .then(resp => resp.json())
      .then(dogs => {dogs.forEach(dog =>{renderOneDog(dog) } ) } )
    }
 
    function renderOneDog(dog){
      let row = document.createElement("tr")
      row.innerHTML = `<td> ${dog.name} </td>
                             <td> ${dog.breed} </td>
                             <td>${dog.sex}</td> 
                             <td><button> Edit </button></td> </tr> `
    tableRow.appendChild(row ) 

    
    let button = document.querySelector("button")
    button.addEventListener("click", function(e) { 

     let input = document.querySelectorAll('input')
     input[0].placeholder = dog.name
     input[1].placeholder = dog.breed
     input[2].placeholder = dog.sex
     console.log(input[2])
      
        
    } )
    

}  
    //    if (input.name === "name") { input.placeholder = dog.name }
    //    if (input.name === "breed") { input.placeholder = dog.breed }
     
    

    }
)