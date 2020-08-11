document.addEventListener('DOMContentLoaded', () => {
// on a page load, a user should be able to view a list of registered dogs

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
  let divContainer = document.createElement('div')

  tdNameContainer.textContent = dogs.name
  tdBreedContainer.textContent = dogs.breed
  tdSexContainer.textContent = dogs.sex
  divContainer.append(tdNameContainer,tdBreedContainer,tdSexContainer)

  console.log(divContainer)

  thContainer.append(divContainer)


}













})
