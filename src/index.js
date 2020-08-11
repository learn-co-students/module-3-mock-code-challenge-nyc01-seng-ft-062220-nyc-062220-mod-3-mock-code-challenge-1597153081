const url = `http://localhost:3000/dogs`
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector(`#table-body`)
    const form = document.querySelector(`form`)
    const renderDogObject = (dog) => {
            const tableRow = document.createElement(`tr`)
            
            tableRow.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button class="edit-btn">Edit</button></td>
            `
            tableBody.append(tableRow)
            
        }

    fetch(url)
    .then(r => r.json())
    .then(dogArray => dogArray.forEach(dogObject => renderDogObject(dogObject)))
    
    document.addEventListener(`click`, e => {
        if (e.target.matches(`.edit-btn`)) {
            const targetDog = e.target.parentNode.parentNode
            form.name.value = targetDog.children[0].innerText
            form.breed.value = targetDog.children[1].innerText
            form.sex.value = targetDog.children[2].innerText
            console.log(targetDog.children[0].innerText)
        }
    })
})