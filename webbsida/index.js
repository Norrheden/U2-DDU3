const boxForContainer = document.getElementById("boxForContainer")
const buttonForAddCity = document.getElementById("buttonForAddCity")
const inputForAddName = document.getElementById("inputForAddName")
const inputForAddCountry = document.getElementById("inputForAddCountry")
const inputForSearchName = document.getElementById("inputForSearchName")
const buttonForSearchCity = document.getElementById("buttonForSearchCity")
const greyBoxForAllSearchCities = document.getElementById("greyBoxForAllSearchCities")
const inputForSearchCountry = document.getElementById("inputForSearchCountry")

const pElementForAddCountry = document.getElementById("pElementForAddCountry")
pElementForAddCountry.style.color = "red"
const pElementForAddName = document.getElementById("pElementForAddName")
pElementForAddName.style.color = "red"

const requestFirst = new Request("http://localhost:8000/cities");

const promiseResponseFirst = fetch(requestFirst);

promiseResponseFirst.then(fullfill);


function fullfill(response) {
    const promiseResource = response.json()
    promiseResource.then(createTheListOfArray)
}


function createTheListOfArray(resource) {
    boxForContainer.innerHTML = "";
    for(let city of resource) {
        const div = document.createElement("div");
        const pElement = document.createElement("p");
        const redButtonElement = document.createElement("button");

        div.className = "cityBox";
        redButtonElement.className = "redButton";

        pElement.textContent = `${city.name}, ${city.country}`;
        redButtonElement.textContent = "Delete";

        div.appendChild(pElement);
        div.appendChild(redButtonElement);
        boxForContainer.appendChild(div);

        redButtonElement.addEventListener("click", function(event){
            const clickedButton = event.target; 
            const parentDiv = clickedButton.parentElement; 
            const pElement = parentDiv.querySelector("p"); 
            const arrayForPelement = pElement.textContent.split(",")
            for(let city of resource) {
                if(city.name === arrayForPelement[0]) {
                    const id = city.id;
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


function restartTheListOfArray(response) {
    if(response.status === 409) {
        pElementForAddName.textContent = "City exist in the list";
        pElementForAddCountry.textContent = "";
    } 
    if(response.status === 400) {
        pElementForAddCountry.textContent = "Missing attribute";
        pElementForAddName.textContent = "";
    }
    if(response.status === 200) {
        pElementForAddCountry.textContent = "";
        pElementForAddName.textContent = "";

    }
    const request = new Request("http://localhost:8000/cities");
    const promiseResponse = fetch(request);
    promiseResponse.then(fullfill);
}





buttonForAddCity.addEventListener("click", function(){
    const request = new Request("http://localhost:8000/cities" , {
        method: "POST",
        body: JSON.stringify({name: inputForAddName.value, country: inputForAddCountry.value}),
        headers: {"Content-Type": "application/json"}
    })
    fetch(request).then(restartTheListOfArray);
})



buttonForSearchCity.addEventListener("click", function(){
    const textValue = inputForSearchName.value;
    const countryValue = inputForSearchCountry.value;
    const request = new Request(`http://localhost:8000/cities/search?text=${textValue}&country=${countryValue}`)
    fetch(request).then(ful);
})

function ful(response) {
    const promiseResource = response.json();
    promiseResource.then(createTheSearchListedCities);

}

function createTheSearchListedCities(resource) {
    if(resource.length === 0) {
        greyBoxForAllSearchCities.textContent = "No cities fund";
    } else {
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
    
}