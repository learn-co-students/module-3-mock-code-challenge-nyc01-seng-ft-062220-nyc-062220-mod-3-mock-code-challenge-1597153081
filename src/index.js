const PREFIX_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {


    const getDogs = async () => {
        let response = await fetch(PREFIX_URL);
        let result = await response.json();
        parseAndRenderDogs(result);
    }

    const getDog = async (dogId, formObj) => {
        let response = await fetch(PREFIX_URL+dogId);
        let result = await response.json();
        formFieldGenerator(result,formObj);
    }

    // params ass for MVP design
    const updateDog = async (dogId, dogObject) => {

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
        return `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td>`
    }

    const form = document.getElementById("dog-form");
   

    const formFieldGenerator = async (dogObj, formObj) => {
        const submitBtn = document.querySelector('[type="submit"]');
        const nameForm = formObj.name,
                    breedForm = formObj.breed,
                    sexForm = formObj.sex;
        
        nameForm.value = dogObj.name,
        breedForm.value = dogObj.breed,
        sexForm.value = dogObj.sex;

        submitBtn.dataset.dogId = dogObj.id;
    }

    const clickHandler = () => {
        
        
        document.addEventListener("click", e => {
            const click = e.target
            // if form, navigate DOM to grab all adjacent inputs above button
            if (click.value === "Submit"){
                e.preventDefault();
                const dogId = click.dataset.dogId;
                const dogFormObj = {
                    name: click.form.name.value,
                    breed: click.form.breed.value,
                    sex: click.form.sex.value
                }

                updateDog(dogId, dogFormObj);
                click.form.reset()

            // else listen for edit clicks 
            } else if (e.target.textContent === "Edit") {
                const formObj = document.getElementById("dog-form")
                const dogId = click.dataset.id
                // passing through formObj to formFieldGen
                //? how do I handle this better? try, catch block with async?
                getDog(dogId, formObj)
            }
        })

    }


getDogs();
clickHandler();
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
        // -- linked dog id to button via dataset
    // >> eventListener
    >> PATCH 
    >> Update DOM for "one page experience"
        >> MVP - new GET request to refresh ALL
        >> Stretch (time permitting) - update targeted Node to minimize API calls

*/