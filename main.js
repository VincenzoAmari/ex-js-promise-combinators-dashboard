async function getDashboardData(query) {
  console.log(`${query}`);
  const response = await fetch("http://localhost:3333/destinations");
  const destination = await response.json();
  console.log(destination);
}

getDashboardData("london");
