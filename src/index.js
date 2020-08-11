const PREFIX_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {


    const getDogs = async () => {
        let response = await fetch(PREFIX_URL);
        let result = await response.json();
        parseAndRenderDogs(result);
    }

    // params as placeholders for MVP design
    const updateDogs = async (dogId, dogObject) => {

        // dogObject = {}

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(dogObject)
        }

        const response = await fetch(PREFIX_URL+dogId, options)
        const result = await response.json();
        // google error handling for pessimistic approach if time permits
    }

    const parseAndRenderDogs = (dogs) => {
        const frag = new DocumentFragment();
        const tableBody = document.getElementById("table-body")

        for (const dog of dogs) {
            const row = document.createElement("tr");
            row.innerHTML = renderDogToRow(dog)
            frag.appendChild(row)
        }
        tableBody.appendChild(frag);
        // debugger;
    }

    const renderDogToRow = (dog) => {
        return `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id="${dog.id}">Edit</button></td>`
    }

    const form = document.getElementById("dog-form");
    const renderDogToForm = (dogId) => {

    }

    const clickHandler = () => {
        
        
        document.addEventListener("click", e => {
            const click = e.target
            // if form, navigate DOM to grab all adjacent inputs above button
            if (click.value === "Submit"){
                console.log("form land")
                // form stuff
            } else if (e.target.textContent === "Edit") {
                const dogId = click.dataset
                debugger;
            }

            // else, listen for edit click only. ignore the rest.
            console.log("Clicky")

        })

    }

    // const formClickHandler = () => {
    //     form.addEventListener("submit", e => {
    //         console.log("Form Mode")
    //         debugger;
    //     })
    // }

getDogs();
clickHandler();
// formClickHandler();

})

/* 

Notes for timed practice coding assessment at Flatiron School

// 1-render list of dogs

//     >> TABLE STRUCTURE
//         NAME || BREED || SEX || EDIT DOG BUTTON
//     >> HTML
//         <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

2-enable that edit button
*   >> "Drop Down" Form with dog's current info
        -- linked dog id to button via dataset
    >> eventListener
    >> PATCH 
    >> Update DOM for "one page experience"
        >> MVP - new GET request to refresh ALL
        >> Stretch (time permitting) - update targeted Node to minimize API calls

*/