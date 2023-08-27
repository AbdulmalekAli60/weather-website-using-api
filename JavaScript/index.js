const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

let cities = [
    {
        "arabicName": "الرياض",
        "englishName": "Riyadh"
    },
    {
        "arabicName": "جدة",
        "englishName": "Jeddah"
    },
    {
        "arabicName": "بريدة",
        "englishName": "Buraydah"
    }
]


const citySelect = document.getElementById("city-select");
const cityNameElement = document.getElementById("city-name");

cities.forEach((city) => {
    const option = document.createElement("option");
    option.textContent = city.arabicName;
    citySelect.appendChild(option);
});

citySelect.addEventListener("change", function () {
    cityNameElement.innerHTML = this.value;

    const cityName = getCityName(this.value);
    getTemperature(cityName);
});

function getCityName(name) {

    for (city of cities) {
        if (city.arabicName == name) {
            return city.englishName
        }
    }
    return ""
}

function getTemperature(city = "Riyadh") {
    axios.get(`${baseUrl}?q=${city}&appid=${apiToken}&units=metric`)
        .then(function (response) {
            const temperature = Math.floor(response.data.main.temp)
            const maxTemp = response.data.main.temp_max
            const minTemp = response.data.main.temp_min

            document.getElementById("temperature").innerHTML = `C ${temperature} `
            document.getElementById("max-temp").innerHTML = `C ${maxTemp} `
            document.getElementById("min-temp").innerHTML = `C ${minTemp}  `

            // console.log(response.data.main);
        })
        .catch(function (error) {
            const errorMessage = error.response.data.message
            console.log(errorMessage);
        })
}
getTemperature()

// fetch(`${baseUrl}?q=${city}&appid=${apiToken}&units=metric`)
// .then(function (response) {
//     if (response.ok) {
//         return response.json();
//     } else {
//         throw new Error('Request failed');
//     }
// })
// .then(function (data) {
//     const temperature = Math.floor(data.main.temp);
//     const maxTemp = data.main.temp_max;
//     const minTemp = data.main.temp_min;

//     document.getElementById("temperature").innerHTML = `C ${temperature} `;
//     document.getElementById("max-temp").innerHTML = `C ${maxTemp} `;
//     document.getElementById("min-temp").innerHTML = `C ${minTemp}  `;
// })
// .catch(function (error) {
//     const errorMessage = error.message;
//     console.log(errorMessage);
// });