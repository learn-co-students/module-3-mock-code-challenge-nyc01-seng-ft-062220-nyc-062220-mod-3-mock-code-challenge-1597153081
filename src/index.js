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
    }

    const renderDogToRow = (dog) => {
        return `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id="${dog.id}">Edit</button></td>`

        // const row = document.createElement("tr");
        
        // return row.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-dog-id="${dog.id}">Edit</button></td>`
    }



getDogs();

})

/* 

Notes for timed practice coding assessment at Flatiron School

// 1-render list of dogs

//     >> TABLE STRUCTURE
//         NAME || BREED || SEX || EDIT DOG BUTTON
//     >> HTML
//         <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

2-enable that edit button
*   >> "Drop Down" Form
    >> eventListener
    >> PATCH 
    >> Update DOM for "one page experience"
        >> MVP - new GET request to refresh ALL
        >> Stretch (time permitting) - update targeted Node to minimize API calls

*/