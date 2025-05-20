async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  try {
    console.log(`${query}`);
    const destinationsPromise = fetchJson("http://localhost:3333/destinations");
    console.log(destinationsPromise);
    const weathersPromise = fetchJson("http://localhost:3333/weathers");
    console.log(weathersPromise);
    const airportsPromise = fetchJson("http://localhost:3333/airports");
    console.log(airportsPromise);

    const promises = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promises);

    return {
      city: destinations[0].name,
      country: destinations[0].country,
      temperature: weathers[0].temperature,
      weathers: weathers[0].weather_description,
      airport: airports[0].name,
    };
  } catch (error) {
    throw new Error("errore nel recupero dati");
  }
}

getDashboardData()
  .then((data) => {
    console.log("Dasboard data:", data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.error(error));
