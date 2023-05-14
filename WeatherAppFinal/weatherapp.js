function ElementBuilder(name) {
  this.element = document.createElement(name);

  this.text = function (text) {
    this.element.textContent = text;
    return this;
  }

  this.placeholder = function (text) {
    this.element.placeholder = text;
    return this;
  }

  this.type = function (type) {
    this.element.type = type;
    return this;
  }

  this.src = function (src) {
    this.element.src = src
    return this;
  }


  this.appendTo = function (parent) {
    if (parent instanceof ElementBuilder) {
      parent
        .build()
        .appendChild(this.element);
    }
    else {
      parent.appendChild(this.element);
    }
    return this;
  }

  this.hide = function () {
    this.element.style.display = 'none';
    return this;
  }

  this.show = function () {
    this.element.style.display = 'block';
    return this;
  }

  this.className = function (className) {
    this.element.className = className
    return this;
  }

  this.id = function (id) {
    this.element.id = id
    return this;
  }

  this.onclick = function (fn) {
    this.element.onclick = fn;
    return this;
  }

  this.build = function () {
    return this.element;
  }

  this.html = function (htmlvalue) {
    this.element.innerHTML = htmlvalue;
    return this;
  }

  this.value = function (value) {
    this.element.value = value;
    return this;
  }

  this.spellcheck = function (spellcheck) {
    this.element.spellcheck = spellcheck;
    return this;
  }
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name);
  }
}

function Painter(container) {
  this.container = container;

  this.init = function () {
    const searchPanel = builder
      .create('div')
      .id('search')
      .appendTo(container);

    const searchBox = builder
      .create('input')
      .type('text')
      .placeholder('enter the city name')
      .id('place-holder')
      .spellcheck(false)
      .appendTo(searchPanel);

    const searchBtn = builder
      .create('button')
      .id('search-button')
      .appendTo(searchPanel)

    const searchBtnImage = builder
      .create('img')
      .src('images/search.png')
      .appendTo(searchBtn)

    const err = builder
      .create('div')
      .id('error')
      .appendTo(container)

    const errMsg = builder
      .create('p')
      .text('Invalid city name')
      .id('error-msg')
      .appendTo(err)

    const weatherStatus = builder
      .create('div')
      .id('weather')
      .appendTo(container)

    const weatherImg = builder
      .create('img')
      .src('images/rain.png')
      .id('weather-icon')
      .appendTo(weatherStatus)

    const weatherTemp = builder
      .create('h1')
      .id('temp')
      .text('22\u00B0c')
      .appendTo(weatherStatus)

    const weatherCity = builder
      .create('h2')
      .id('city')
      .text('New York')
      .appendTo(weatherStatus)

    const weatherDetails = builder
      .create('div')
      .id('details')
      .appendTo(weatherStatus)

    const weatherHumidity = builder
      .create('div')
      .id('col')
      .appendTo(weatherDetails)

    const humidityImg = builder
      .create('img')
      .src('images/humidity.png')
      .appendTo(weatherHumidity)

    const humidityDetails = builder
      .create('div')
      .appendTo(weatherHumidity)

    const humidityPercentage = builder
      .create('p')
      .id('humidity')
      .text('50%')
      .appendTo(humidityDetails)

    const humidityText = builder
      .create('p')
      .text('Humidity')
      .appendTo(humidityDetails)

    const weatherWind = builder
      .create('div')
      .id('col')
      .appendTo(weatherDetails)

    const windImg = builder
      .create('img')
      .src('images/wind.png')
      .appendTo(weatherWind)

    const windDetails = builder
      .create('div')
      .appendTo(weatherWind)

    const windSpeed = builder
      .create('p')
      .id('wind')
      .text('15 km/h')
      .appendTo(windDetails)

    const windText = builder
      .create('p')
      .id('speed')
      .text('Wind Speed')
      .appendTo(windDetails)
  }
}


const weatherContainer = document.getElementById('card')
const app = new Painter(weatherContainer)
app.init();



//App

const apiKey = "0249b149a77554f33b6f3f3cfe6b98dc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#search button");
const weatherIcon = document.querySelector("#weather-icon");


async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#weather").style.display = "none";
  }
  else {
    var data = await response.json();

    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + "\u00B0c";
    document.querySelector('#humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('#wind').innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector("#weather").style.display = "block";
    document.querySelector("#error").style.display = "none";
  }

}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
})



