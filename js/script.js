// Selecting DOM elements
const inputForm = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const wind = document.querySelector("#wind");
const icon = document.querySelector("#icon");
const content = document.querySelector(".content-search");

// Adding click event listener to search button
searchBtn.addEventListener("click", () => {
  // Check if input value is empty
  if (!inputForm.value) return;

  // Call API data fetching function
  getDataApi();
});

// Asynchronous function to fetch data from API
async function getDataApi() {
  // Constructing API URL with encoded city name
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    inputForm.value
  )}&units=metric&appid=24c7bcb7ef1cf36d5ecf7fc045f2c9c1`;

  try {
    // Fetching API data and awaiting response
    const res = await fetch(url);
    const data = await res.json();

    // Checking if city data was not found
    if (data?.cod && data.cod === "404") {
      return alert("CITY NOT FOUND");
    }

    // Calling function to load data onto the page
    loadData(data);
  } catch (error) {
    alert(error);
  }
}

// Function to load data onto the page
function loadData(data) {
  // Displaying city name and country
  city.innerHTML = `<i class="fa-solid fa-location-dot" style="color: #ffffff;"></i>${data.name}, ${data.sys.country}`;
  // Displaying temperature
  temperature.innerHTML = `${Math.floor(data.main.temp)}ºC`;
  // Displaying wind speed
  wind.innerHTML = `<i class="fa-solid fa-wind" style="color: #ffffff;"></i> ${data.wind.speed} Km/h`;
  // Displaying the content section
  content.style.display = "flex";
}
