let weather = {
  apiKey: "b57e774c3aadf3213395730d1a1bec4a",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&lang=es&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No pudimos encontrar tu ciudad.");
          throw new Error("Ingresa otra búsqueda.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, feels_like, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText =
      "La temperatura actual en " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".temp_min").innerText =
      "La temperatura mínima es " + temp_min + " °C";
    document.querySelector(".temp_max").innerText =
      "La temperatura máxima es " + temp_max + " °C";
    document.querySelector(".feels_like").innerText =
      "Sensación térmica " + feels_like + " °C";
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + " %";
    document.querySelector(".wind").innerText =
      "Velocidad del viento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },

  //? funciones de busqueda para el botón y la search bar
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

//?muestra la cuidad inicial

weather.fetchWeather("Ciudad de Mexico");
