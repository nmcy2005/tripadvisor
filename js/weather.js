let tempDisplay = document.querySelector('.temp');
let locationDisplay = document.querySelector('.weather-area')
let description = document.querySelector('.temp-description');
let inputValue = document.querySelector('.inputValueTo');



function displayWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=metric&appid=529841575cb95a81b76881cb813a6981')
    .then(response => response.json())
    .then(data => {
        var location = data['name'];
        var temp = data['main']['temp'];
        var desc = data['weather'][0]['description'];
    
        locationDisplay.innerHTML = location;
        tempDisplay.innerHTML = temp + "°C";
        description.innerHTML = desc;
    })


    .catch(err => alert("Wrong city name", err))
}

