const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8994e690937c2b49c091fe9625fc68f3";

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)} F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);

    getWeatherEmoji(id);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            document.body.style.backgroundImage = "url('https://www.thoughtco.com/thmb/U66MX1ZBcRS7WEqt3dH_LWnYwd0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-673747736-5b1989c3fa6bcc003614911a.jpg')";
            break;
        case (weatherId >= 300 && weatherId < 400):
            document.body.style.backgroundImage = "url('https://www.mlive.com/resizer/jyhutLB7ytXYxk1Cgf9t6A7USJs=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/7TPNT3GG5ZBRXMY7DBJGGPS7EQ.jpg')";
            break;
        case (weatherId >= 500 && weatherId < 600):
            document.body.style.backgroundImage = "url('https://www.itl.cat/pngfile/big/103-1038512_kerala-background-images-hd-girls-walking-in-rain.jpg')";
            break;
        case (weatherId >= 600 && weatherId < 700):
            document.body.style.backgroundImage = "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-winter-mountains-with-inversion-during-golden-hour-free-photo.jpg?w=600&quality=80')";
            break;
        case (weatherId >= 700 && weatherId < 800):
            document.body.style.backgroundImage = "url('https://images5.alphacoders.com/387/387477.jpg')";
            break;
        case (weatherId === 800):
            document.body.style.backgroundImage = "url('https://qph.cf2.quoracdn.net/main-qimg-e617a9f084880abc6dabeb39f8331375-lq')";
            break;
        case (weatherId >= 801 && weatherId < 810):
            document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/01/80/12/84/360_F_180128463_spbJ46g13xHQdHlf13Wlm41t13W5u44d.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('https://www.davidjenner.co.uk/landscapes/files/stacks-image-bfe4bf0.jpg')";
            break;
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    } else {
        displayError("Please enter a city");
    }
});

