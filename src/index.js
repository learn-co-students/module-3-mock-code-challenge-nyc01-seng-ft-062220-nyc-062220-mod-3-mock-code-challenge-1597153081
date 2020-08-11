document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = "http://localhost:3000/dogs"
    const table = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    

    function getDogs(){
        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs  => dogs.forEach (dog => renderDogs(dog)))
    }
    
    getDogs()

    

    function renderDogs(dog){
            const tr = document.createElement("tr")
            tr.dataset.id = dog.id
            tr.innerHTML =`
            <tr><td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button>Edit</button></td></tr>
            `
            table.append(tr)
            
        }
        
            table.addEventListener("click",function(e){
                if(e.target.innerHTML === "Edit"){
                    let tableRow = e.target.parentNode.parentNode
                    let tableData = tableRow.innerHTML[0]
                    console.log(tableData)
                    

                    
                  
                    
                    

                }

            })
                   
                    
                        
                        
                
     

    



    
})