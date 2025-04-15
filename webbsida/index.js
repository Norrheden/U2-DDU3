const boxForContainer = document.getElementById("boxForContainer")
const buttonForAddCity = document.getElementById("buttonForAddCity")
const inputForAddName = document.getElementById("inputForAddName")
const inputForAddCountry = document.getElementById("inputForAddCountry")
const inputForSearchName = document.getElementById("inputForSearchName")
const buttonForSearchCity = document.getElementById("buttonForSearchCity")
const greyBoxForAllSearchCities = document.getElementById("greyBoxForAllSearchCities")
const inputForSearchCountry = document.getElementById("inputForSearchCountry")

// GET citybox, Webb start here
const request = new Request("http://localhost:8000/cities");

const promiseResource = fetch(request);

promiseResource.then(fullfill);

// take the resource promise
function fullfill(response) {
    const promiseResource = response.json()
    promiseResource.then(createTheListOfArray)
}

// Create the list of cities
function createTheListOfArray(resource) {
    console.log(resource)
    boxForContainer.innerHTML = ""
    for(let city of resource) {
        const div = document.createElement("div")
        const pElement = document.createElement("p");
        const redButtonElement = document.createElement("button")

        div.className = "cityBox"
        redButtonElement.className = "redButton"

        pElement.textContent = `${city.name}, ${city.country}`;
        redButtonElement.textContent = "Delete"

        div.appendChild(pElement);
        div.appendChild(redButtonElement);
        boxForContainer.appendChild(div);

        redButtonElement.addEventListener("click", function(event){
            const clickedButton = event.target; // Knappen som klickades
            const parentDiv = clickedButton.parentElement; // Hitta dess förälder (div)
            const pElement = parentDiv.querySelector("p"); // Hitta p-elementet inuti div
            const arrayForPelement = pElement.textContent.split(",")
            for(let city of resource) {
                if(city.name === arrayForPelement[0]) {
                    const id = city.id
                    const request = new Request("http://localhost:8000/cities", { 
                        method: "DELETE",
                        body: JSON.stringify({id:id}),
                        headers: {"Content-Type": "application/json"}
                    })
                    fetch(request).then(restartTheListOfArray);
                }
            }
        })
    }
}

//Function restart the list of city
function restartTheListOfArray(response) {
    const request = new Request("http://localhost:8000/cities");
    const promiseResponse = fetch(request);
    promiseResponse.then(fullfill);
}



// Add city

buttonForAddCity.addEventListener("click", function(){
    const request = new Request("http://localhost:8000/cities" , {
        method: "POST",
        body: JSON.stringify({name: inputForAddName.value, country: inputForAddCountry.value}),
        headers: {"Content-Type": "application/json"}
    })
    fetch(request).then(restartTheListOfArray)
})

//

buttonForSearchCity.addEventListener("click", function(){
    const textValue = inputForSearchName.value;
    const countryValue = inputForSearchCountry.value;
    const request = new Request(`http://localhost:8000/cities/search?text=${textValue}&country=${countryValue}`)
    fetch(request).then(ful)
})

function ful(response) {
    const promiseResource = response.json();
    console.log(promiseResource)
    promiseResource.then(createTheSearchListedCities);

}
function createTheSearchListedCities(resource) {
    console.log(resource);
    greyBoxForAllSearchCities.innerHTML = "";
    for(let city of resource) {
        const div = document.createElement("div");
        const pElement = document.createElement("p");
        div.className = "cityBox";
        pElement.textContent = `${city.name}, ${city.country}`;
        div.appendChild(pElement);
        greyBoxForAllSearchCities.appendChild(div);
    }
}