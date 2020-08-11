const PREFIX_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {

    // helper function for MVP re-rendering Objective
    const removeAllChildNodesFromParent = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

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

    const updateDog = async (dogId, dogObject) => {

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
        
        // MVP implementation to re-rendering page dynamically
        removeAllChildNodesFromParent(document.getElementById("table-body"))
        getDogs();
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

        >> Stretch 
            - (time permitting) - update targeted Node to minimize API calls
            - "Drop Down" Form with dog's current info
            - async/await error handling with try/catch
            - time permitting, refactor to do partial re-render with frags

*/