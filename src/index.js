document.addEventListener('DOMContentLoaded', () => {
// on apage load, a user should be able to view a list of registered dogs

fetch('http://localhost:3000/dogs')
.then(function(response){
  return response.json()
})
.then(function(dogsObject){
  console.log(dogsObject)

  dogsObject.forEach(dog => addDog(dog))
})

function addDog(dogs){
  const thContainer = document.querySelector('th')
  let tdNameContainer = document.createElement('td')
  let tdBreedContainer = document.createElement('td')
  let tdSexContainer = document.createElement('td')

  tdNameContainer.textContent = dogs.name
  thContainer.appendChild(tdNameContainer).style.verticalAlign = "bottom";
  console.log(thContainer)
  tdBreedContainer.textContent = dogs.breed
  tdSexContainer.textContent = dogs.sex






}











})
