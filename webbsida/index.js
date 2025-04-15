const boxForContainer = document.getElementById("boxForContainer")
const buttonForAddCity = document.getElementById("buttonForAddCity")
const inputForAddName = document.getElementById("inputForAddName")
const inputForAddCountry = document.getElementById("inputForAddCountry")


// GET citybox
const request = new Request("http://localhost:8000/cities");

const promiseResource = fetch(request);

promiseResource.then(fullfill);

function fullfill(response) {
    const promiseResource = response.json()
    promiseResource.then(ful)
}
function ful(resource) {
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
                    fetch(request).then(restartFullfill);
                }
            }
        })
    }
}

function restartFullfill(response) {
    const request = new Request("http://localhost:8000/cities");
    const promiseResource = fetch(request);
    promiseResource.then(fullfill);
}



// Add city

buttonForAddCity.addEventListener("click", function(){
    const request = new Request("http://localhost:8000/cities" , {
        method: "POST",
        body: JSON.stringify({name: inputForAddName.value, country: inputForAddCountry.value}),
        headers: {"Content-Type": "application/json"}
    })
    fetch(request).then(restartFullfill)
})