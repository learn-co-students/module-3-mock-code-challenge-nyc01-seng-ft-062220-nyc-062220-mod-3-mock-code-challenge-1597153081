const PREFIX_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {


    const getDogs = async () => {
        let response = await fetch(PREFIX_URL);
        let result = await response.json();
        console.log(result);
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

getDogs();

})

/* 

Notes for timed practice coding assessment at Flatiron School

1-render list of dogs

    >> TABLE STRUCTURE
        NAME || BREED || SEX || EDIT DOG BUTTON
    >> HTML
        <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

2-enable that edit button
*   >> "Drop Down" Form
    >> eventListener
    >> PATCH 
    >> Update DOM for "one page experience"
        >> MVP - new GET request to refresh ALL
        >> Stretch (time permitting) - update targeted Node to minimize API calls

*/