const url = `http://localhost:3000/dogs`
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector(`#table-body`)
    const form = document.querySelector(`form`)
    const renderDogObject = (dog) => {
            const tableRow = document.createElement(`tr`)
            
            tableRow.dataset.id = dog.id
            tableRow.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button class="edit-btn">Edit</button></td>
            `
            tableBody.append(tableRow)
            
    }
    const renderDogs = () => {
        fetch(url)
        .then(r => r.json())
        .then(dogArray => dogArray.forEach(dogObject => renderDogObject(dogObject)))
    }
    const refreshDogs = () => {
        tableBody.querySelectorAll(`tr`).forEach(tableRow => tableRow.remove())
        renderDogs()
    }

    renderDogs()
    
    document.addEventListener(`click`, e => {
        if (e.target.matches(`.edit-btn`)) {
            const targetDog = e.target.parentNode.parentNode
            form.name.value = targetDog.children[0].innerText
            form.breed.value = targetDog.children[1].innerText
            form.sex.value = targetDog.children[2].innerText
            form.dataset.currentId = targetDog.dataset.id
        }
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        const id = form.dataset.currentId
        const dogObject = {
            id: id,
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        }

        fetch(url + `/${id}`, {
            method: `PATCH`,
            headers: {
                "content-type": `application/json`,
                accept: `application/json`
            },
            body: JSON.stringify(dogObject)
        })
        .then(r => r.json())
        .then(() => refreshDogs())
    })
})