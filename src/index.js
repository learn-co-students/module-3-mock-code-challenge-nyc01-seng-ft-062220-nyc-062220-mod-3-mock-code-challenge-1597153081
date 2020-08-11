document.addEventListener('DOMContentLoaded', () => {

    const dogsTable = document.querySelector("#table-body")
    function getDogs() {
        fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                    <td>${dog.name}</td>
                    <td>${dog.breed}</td>
                    <td>${dog.sex}</td>
                    <td><button class="edit-btn">EDIT</button></td>
                `
                tr.dataset.id = dog.id 
                dogsTable.appendChild(tr)
            })
        })
    }

    const form = document.querySelector("form")
    function clickHandler() {
        document.addEventListener("click", e => {
            if (e.target.className === "edit-btn") {
                form.children[0].value = e.target.parentNode.parentNode.children[0].innerText
                form.children[1].value = e.target.parentNode.parentNode.children[1].innerText
                form.children[2].value = e.target.parentNode.parentNode.children[2].innerText
            }
        })
    }

    function patchDog(num) {
        const options = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: form.children[0].value,
                breed: form.children[1].value,
                sex: form.children[2].value
            })
        }

        fetch(`http://localhost:3000/dogs/${num}`, options)
        .then(response => response.json())
        .then(updatedDog => {
            const previousDogData = document.querySelector(`tr[data-id="${num}"]`)
            previousDogData.innerHTML = `
            <td>${updatedDog.name}</td>
            <td>${updatedDog.breed}</td>
            <td>${updatedDog.sex}</td>
            <td><button class="edit-btn">EDIT</button></td>
        `
        })
    }


    // document.addEventListener('submit', e => {
    //     e.preventDefault()
    //     const tdTags = document.querySelectorAll('td')
    //     const dogName = e.target.parentNode.children[0].value 
    //     let num = 0 
    //     for (let i=0; i<tdTags.length; i++) {
    //         if (tdTags[i].textContent == dogName) {
    //             num = tdTags[i]
    //             debugger
    //             break
    //         }
    //     }
    //     console.log(num)
    //     pathDog(e.target)
    // })




    getDogs()
    clickHandler()
})