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

for (city of cities) {
    let content = `
            <option>${city.arabicName}</option>
            `
    document.getElementById("city-select").innerHTML += content
}

document.getElementById("city-select").addEventListener("change", function () {
    document.getElementById("city-name").innerHTML = this.value

    let cityName = getCityName(this.value)
    // console.log(cityName);
    getTemperature(cityName)

})

function getCityName(name) {
    let City = ""
    for (city of cities) {
        if (city.arabicName == name) {
            City = city.englishName
        }
    }
    return City
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