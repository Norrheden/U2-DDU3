const test1 = document.getElementById("test1")
const test2 = document.getElementById("test2")
const test3 = document.getElementById("test3")
const test4 = document.getElementById("test4")
const test5 = document.getElementById("test5")
const test6 = document.getElementById("test6")
const test7 = document.getElementById("test7")
const test8 = document.getElementById("test8")
const test9 = document.getElementById("test9")
const test10 = document.getElementById("test10")
const test11 = document.getElementById("test11")
const test12 = document.getElementById("test12")
const test13 = document.getElementById("test13")
const test14 = document.getElementById("test14")






//1 Async
test1.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities")
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
    }
    getResponse()

})

//2 Then
test2.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "POST",
        body: JSON.stringify({name: "Malmö", country: "Sweden"}),
        headers: {"Content-Type" : "application/json"}
    })
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }

})

//3 Async
test3.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "DELETE",
        body: JSON.stringify({id: 2}),
        headers: {"Content-Type" : "application/json"}
    })
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        

        
    }
    getResponse()


})

//4 Then
test4.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities")
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }


})

// 5 Async
test5.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities/43")
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        
    }
    getResponse()

})

// 6 Then
test6.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en")
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }
})

// 7 async

test7.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities/search?text=en&country=Sweden")
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        
    }
    getResponse()

})
//_________________________

// 8 Then
test8.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "POST",
        body: JSON.stringify({name: "Dresden",country: "Germany"}),
        headers: {"Content-Type" : "application/json"}
    })
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }
})

// 9 Async
test9.addEventListener("click", function(){
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "POST",
        body: JSON.stringify({name: "Dresden"}),
        headers: {"Content-Type" : "application/json"}
    })
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        
    }
    getResponse()

})

//10 Then
test10.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "DELETE",
        body: JSON.stringify({ id: 56 }),
        headers: {"Content-Type" : "application/json"}
    })
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }
})

// 11 Async
test11.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/cities", {
        method: "DELETE",
        body: JSON.stringify({}),
        headers: {"Content-Type" : "application/json"}
    })
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        
    }
    getResponse()
    
})

// 12 Then
test12.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/messages", {
        method: "POST",
        body: JSON.stringify({from: 2,to: 1,password: "pass"}),
        headers: {"Content-Type" : "application/json"}
    })
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }
})
//13 Async
test13.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/cities/search")
    async function getResponse() {
        const responsePromise = fetch(request);
        const response = await responsePromise;
        const resource = await response.json() // För att response.json() retunerar en promise
        
    }
    getResponse()
    
})

//14 Then
test14.addEventListener("click", function() {
    const request = new Request("http://0.0.0.0:8000/mordor", {
        method: "DELETE",
        body: JSON.stringify({from: 2,to: 1,password: "pass"}),
        headers: {"Content-Type" : "application/json"}
    })
    const responsePromise = fetch(request);
    responsePromise.then(fullfill);
    function fullfill(response) {
        const resourcePromise = response.json()
        resourcePromise.then(fullfillResource)
    }
    function fullfillResource(resource) {
        
    }
})










