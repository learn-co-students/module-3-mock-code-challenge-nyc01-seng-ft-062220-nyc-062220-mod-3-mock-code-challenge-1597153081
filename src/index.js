document.addEventListener('DOMContentLoaded', getDogs)
const URL = "http://localhost:3000/dogs/"

const renderDogs = dogs => {
    const dogTable = document.querySelector('#table-body')
    dogTable.innerHTML = ''

    for (const dog of dogs) {
      renderDog(dog, dogTable)
    }
  }

const renderDog = (dog, dogTable) => {
    const dogRow = document.createElement("tr")
    dogRow.dataset.dogId = `${dog.id}`
    dogRow.innerHTML = `
    <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>
    `
    dogTable.append(dogRow)
};

const editDogHandler = () => {

    const selectDog = () => {
        document.addEventListener("click", e => {
            if (e.target.matches("button")){
                button = e.target
                fillEditForm(button);
            };
        });
    };

    const fillEditForm = (button) => {
        const dogEditForm = document.querySelector("#dog-form")
        const dogRow = button.closest("tr")
        dogEditForm.name.value = dogRow.children[0].innerText
        dogEditForm.breed.value = dogRow.children[1].innerText
        dogEditForm.sex.value = dogRow.children[2].innerText
        dogEditForm.dataset.dogId = dogRow.dataset.dogId
    };

    const submitEditForm = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            dogObj = {
                "name": `${e.target.name.value}`,
                "breed": `${e.target.breed.value}`,
                "sex": `${e.target.sex.value}`
            }
            dogId = e.target.dataset.dogId
            
            patchDog(dogId, dogObj)
            .then(response => {
                getDogs()
                e.target.reset()
            });
        });
    };
    selectDog();
    submitEditForm();
};
editDogHandler();

// fetch functions
const patchDog = (dogId, dogObj) => {
    options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dogObj)
    };

    return fetch(URL+dogId, options)
};

function getDogs() {
    fetch(URL)
    .then(response => response.json())
    .then(dogs => {
      renderDogs(dogs)
    })
}