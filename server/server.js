
const cities = [
  { id: 2, name: "Lille", country: "France"},
  { id: 3, name: "Nantes", country: "France"},
  { id: 5, name: "Bremen", country: "Germany"},
  { id: 10, name: "Dresden", country: "Germany"},
  { id: 11, name: "Heidelberg", country: "Germany"},
  { id: 12, name: "Venice", country: "Italy"},
  { id: 13, name: "Rome", country: "Italy"},
  { id: 16, name: "Graz", country: "Austria"},
  { id: 20, name: "Basel", country: "Switzerland"},
  { id: 21, name: "Lucerne", country: "Switzerland"},
  { id: 22, name: "Kraków", country: "Poland"},
  { id: 23, name: "Warsaw", country: "Poland"}, 
  { id: 24, name: "Poznań", country: "Poland"},
  { id: 28, name: "Ghent", country: "Belgium"},
  { id: 31, name: "Maastricht", country: "Netherlands"},
  { id: 38, name: "Maribor", country: "Slovenia"},
  { id: 42, name: "Strasbourg", country: "France"},
];
let array = JSON.stringify(cities)


async function handler (request) {

  const url = new URL(request.url)
  const urlCheckIdForCityRoute = new URLPattern({pathname: "/cities/:id"})
  const urlCheckIdForCityMatch = urlCheckIdForCityRoute.exec(url)
  const headersCors = new Headers();
  headersCors.set("access-control-allow-origin", "*");
  headersCors.set("Content-Type", "application/json")

  if(url.pathname === "/cities/search") {
    if(url.searchParams.has("text")) {
      
      let text = url.searchParams.get("text");
      let country = url.searchParams.get("country")
      let arrayForSearchParams = [];
      if(text === "") {
        const response = new Response(JSON.stringify(arrayForSearchParams), {
          status: 200,
          headers: headersCors,
        });
        return response;
      }
      for (let city of cities) {
        if (city.name.toLowerCase().includes(text.toLowerCase()) ) {
          if (!country || city.country === country) {
            arrayForSearchParams.push(city);
          } 

        }
      }
      
      const response = new Response(JSON.stringify(arrayForSearchParams), {
        status: 200,
        headers: headersCors,
      });
      return response;
      
    }
    const response = new Response(null, {
      status: 400,
      headers: headersCors
    })
    return response
  }
  

  if (url.pathname === "/cities") {
    if (request.method === "OPTIONS") { ////////////////// MÅSTE HA VRF WTFFFFFFFFFFFFFFF
      headersCors.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
      headersCors.set("Access-Control-Allow-Headers", "Content-Type");
      return new Response(null, {
        status: 204,
        headers: headersCors
      });
    }
    
    if (request.method === "GET") {
      let response = new Response(array, {
        status: 200,
        headers: headersCors
      });
      return response;
    }
    if (request.method === "DELETE") {
      
      let requestBody = await request.json();
      if(!requestBody.id) {
        const response = new Response(null, {
          status: 400,
          headers: headersCors
        })
        return response;
      } else {
        for (let i = 0; i < cities.length; i++) {
          if (requestBody.id === cities[i].id) {
            cities.splice(i, 1);
            array = JSON.stringify(cities)
            const response = new Response(JSON.stringify({ delete: "Delete ok" }), {
              status: 200,
              headers: headersCors
            });
            return response;
          }
        }
        const response = new Response(JSON.stringify({ error: "City not found" }), {
          status: 404,
          headers: headersCors
        });
        return response;

      }
    }
    if(request.method === "POST") {
      let requestBody = await request.json();
      console.log(requestBody)
      if(!requestBody.name || !requestBody.country) {
        const response = new Response(null, {
          status: 400,
          headers: headersCors
        })
        return response;
      }
      for(let city of cities) {
        if(requestBody.name === city.name) {
          const response = new Response(null, {
            status: 409,
            headers: headersCors
          })
          return response;
        }
      }
      let maxId = 0
      for(let city of cities) {
        if(city.id > maxId) {
          maxId = city.id
        }
      }
      let newObject = {
        id: maxId + 1,
        name: requestBody.name,
        country: requestBody.country
      };
      cities.push(newObject);
      array = JSON.stringify(cities)
      const response = new Response(JSON.stringify(newObject), {
        status: 200,
        headers: headersCors
      })
      return response;

    }
  }



  if(urlCheckIdForCityMatch) {
    const numberId = Number(urlCheckIdForCityMatch.pathname.groups.id);
    for(let city of cities) {
      if(city.id === numberId) {
        const response = new Response(JSON.stringify(city), {
          status: 200,
          headers: headersCors
        })
        return response
      }
    }
    const response = new Response(null, {
      status: 404,
      headers: headersCors
    })
    return response;
  }
  const response = new Response(null, {
    status: 400,
    headers: headersCors
  })
  return response;

  

  
  

}

Deno.serve(handler);