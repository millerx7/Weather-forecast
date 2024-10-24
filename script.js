document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value; // Corrigido aqui

    if (!cityName) {
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apikey = '847e13edd8fa34b0df67fb4df4eaef6b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apikey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showinfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windspeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        showAlert(`Não foi possivel localizar... <img src="./images/404.svg"/>`)
    }
});

function showinfos(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp-value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp-description').innerHTML = `${json.description}`
    document.querySelector('#temp-img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}`;
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.wind.windspeed.toFixed(1)} Km/h`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
