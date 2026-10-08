/* =====================================================
   SMART FARM - LIVE WEATHER SYSTEM
   ENGLISH + TELUGU
   OpenWeather API
===================================================== */


/* =====================================================
   OPENWEATHER API
===================================================== */

const API_KEY = "ae9f4ea5eeeae880834e553513b1dc25";

let currentCity = "Paderu";


/* =====================================================
   TRANSLATIONS
===================================================== */

const translations = {

    en: {

        dashboard:
            "📊 Dashboard",

        cropPlanning:
            "🌱 Crop Planning",

        irrigation:
            "💧 Irrigation",

        weather:
            "🌦️ Weather",

        market:
            "💰 Market",

        records:
            "📒 Farm Records",

        logout:
            "Logout",

        language:
            "Language",

        weatherTitle:
            "🌦️ Live Weather Information",

        weatherDescription:
            "Real-time weather conditions for your farm.",

        selectLocation:
            "📍 Select Location",

        cityPlaceholder:
            "Enter city name",

        getWeather:
            "🔍 Get Weather",

        humidity:
            "Humidity",

        wind:
            "Wind",

        rain:
            "Rain",

        feelsLike:
            "Feels Like",

        minimum:
            "Minimum",

        maximum:
            "Maximum",

        cloudiness:
            "Cloudiness",

        visibility:
            "Visibility",

        fiveDayForecast:
            "📅 5-Day Weather Forecast",

        loadingWeather:
            "Loading live weather...",

        loadingLocation:
            "📍 Loading location...",

        checkingWeather:
            "⚠ Checking weather conditions...",

        liveUpdated:
            "✅ Live weather updated for",

        cityNotFound:
            "City was not found.",

        invalidKey:
            "Invalid API key. Check your OpenWeather API key.",

        apiLimit:
            "API request limit exceeded.",

        forecastUnavailable:
            "⚠️ Forecast unavailable.",

        unableForecast:
            "⚠️ Unable to load weather forecast.",

        noRain:
            "No rain",

        rainChance:
            "rain"
    },


    te: {

        dashboard:
            "📊 డ్యాష్‌బోర్డ్",

        cropPlanning:
            "🌱 పంటల ప్రణాళిక",

        irrigation:
            "💧 నీటిపారుదల",

        weather:
            "🌦️ వాతావరణం",

        market:
            "💰 మార్కెట్",

        records:
            "📒 వ్యవసాయ రికార్డులు",

        logout:
            "లాగ్ అవుట్",

        language:
            "భాష",

        weatherTitle:
            "🌦️ ప్రత్యక్ష వాతావరణ సమాచారం",

        weatherDescription:
            "మీ వ్యవసాయ క్షేత్రానికి సంబంధించిన ప్రత్యక్ష వాతావరణ పరిస్థితులు.",

        selectLocation:
            "📍 ప్రాంతాన్ని ఎంచుకోండి",

        cityPlaceholder:
            "నగరం పేరు నమోదు చేయండి",

        getWeather:
            "🔍 వాతావరణాన్ని పొందండి",

        humidity:
            "తేమ",

        wind:
            "గాలి",

        rain:
            "వర్షం",

        feelsLike:
            "అనుభూతి ఉష్ణోగ్రత",

        minimum:
            "కనిష్టం",

        maximum:
            "గరిష్టం",

        cloudiness:
            "మేఘావృతం",

        visibility:
            "దృశ్యమానత",

        fiveDayForecast:
            "📅 5 రోజుల వాతావరణ సూచన",

        loadingWeather:
            "ప్రత్యక్ష వాతావరణ సమాచారం లోడ్ అవుతోంది...",

        loadingLocation:
            "📍 ప్రాంతం లోడ్ అవుతోంది...",

        checkingWeather:
            "⚠ వాతావరణ పరిస్థితులను తనిఖీ చేస్తున్నాము...",

        liveUpdated:
            "✅ ప్రత్యక్ష వాతావరణం నవీకరించబడింది:",

        cityNotFound:
            "నగరం కనుగొనబడలేదు.",

        invalidKey:
            "API కీ చెల్లదు. మీ OpenWeather API కీని తనిఖీ చేయండి.",

        apiLimit:
            "API అభ్యర్థన పరిమితి దాటిపోయింది.",

        forecastUnavailable:
            "⚠️ వాతావరణ సూచన అందుబాటులో లేదు.",

        unableForecast:
            "⚠️ వాతావరణ సూచనను లోడ్ చేయలేకపోయాము.",

        noRain:
            "వర్షం లేదు",

        rainChance:
            "వర్షం"
    }

};


/* =====================================================
   CURRENT LANGUAGE
===================================================== */

let currentLanguage =
    localStorage.getItem("selectedLanguage") || "en";


/* =====================================================
   DOM ELEMENTS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const cityInput =
            document.getElementById("cityInput");

        const searchButton =
            document.getElementById("searchWeather");

        const weatherStatus =
            document.getElementById("weatherStatus");

        const temperature =
            document.getElementById("temperature");

        const description =
            document.getElementById("description");

        const locationName =
            document.getElementById("locationName");

        const humidity =
            document.getElementById("humidity");

        const wind =
            document.getElementById("wind");

        const rain =
            document.getElementById("rain");

        const feelsLike =
            document.getElementById("feelsLike");

        const minTemp =
            document.getElementById("minTemp");

        const maxTemp =
            document.getElementById("maxTemp");

        const clouds =
            document.getElementById("clouds");

        const visibility =
            document.getElementById("visibility");

        const weatherIcon =
            document.getElementById("weatherIcon");

        const forecast =
            document.getElementById("forecast");

        const farmingTip =
            document.getElementById("farmingTip");

        const logoutBtn =
            document.getElementById("logoutBtn");


        /* =================================================
           REQUIRED ELEMENT CHECK
        ================================================= */

        if (
            !cityInput ||
            !searchButton ||
            !weatherStatus
        ) {

            console.error(
                "❌ Required weather HTML elements are missing."
            );

            return;

        }


        /* =================================================
           LANGUAGE SWITCHER
        ================================================= */

        const languageSelect =
            document.getElementById(
                "languageSelect"
            );


        function changeLanguage(language) {

            currentLanguage = language;

            localStorage.setItem(
                "selectedLanguage",
                language
            );


            const elements =
                document.querySelectorAll(
                    "[data-lang]"
                );


            elements.forEach(element => {

                const key =
                    element.getAttribute(
                        "data-lang"
                    );


                if (
                    translations[language] &&
                    translations[language][key]
                ) {

                    element.textContent =
                        translations[language][key];

                }

            });


            /* Input placeholders */

            const placeholderElements =
                document.querySelectorAll(
                    "[data-placeholder]"
                );


            placeholderElements.forEach(
                element => {

                    const key =
                        element.getAttribute(
                            "data-placeholder"
                        );


                    if (
                        translations[language] &&
                        translations[language][key]
                    ) {

                        element.placeholder =
                            translations[language][key];

                    }

                }
            );


            /* HTML language */

            document.documentElement.lang =
                language === "te"
                    ? "te"
                    : "en";


            /* Page title */

            document.title =
                language === "te"
                    ? "ప్రత్యక్ష వాతావరణ సమాచారం"
                    : "Live Weather Information";


            /* Update status */

            if (
                weatherStatus.textContent.includes(
                    "Loading"
                )
            ) {

                weatherStatus.textContent =
                    translations[language]
                        .loadingWeather;

            }

        }


        if (languageSelect) {

            languageSelect.value =
                currentLanguage;


            languageSelect.addEventListener(
                "change",
                function () {

                    changeLanguage(
                        this.value
                    );

                }
            );

        }


        /* =================================================
           WEATHER EMOJI
        ================================================= */

        function getWeatherEmoji(condition) {

            const icons = {

                Clear: "☀️",

                Clouds: "☁️",

                Rain: "🌧️",

                Drizzle: "🌦️",

                Thunderstorm: "⛈️",

                Snow: "❄️",

                Mist: "🌫️",

                Smoke: "🌫️",

                Haze: "🌫️",

                Dust: "🌫️",

                Fog: "🌫️",

                Sand: "🌫️",

                Ash: "🌋",

                Squall: "🌬️",

                Tornado: "🌪️"

            };

            return icons[condition] || "🌦️";

        }


        /* =================================================
           CAPITALIZE
        ================================================= */

        function capitalize(text) {

            if (!text) return "";

            return text
                .split(" ")
                .map(word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
                )
                .join(" ");

        }


        /* =================================================
           CURRENT WEATHER
        ================================================= */

        async function getCurrentWeather(city) {

            try {

                weatherStatus.textContent =
                    translations[currentLanguage]
                        .loadingWeather;


                const url =
                    "https://api.openweathermap.org/data/2.5/weather?" +
                    `q=${encodeURIComponent(city)}` +
                    `&appid=${API_KEY}` +
                    `&units=metric`;


                const response =
                    await fetch(url);


                if (!response.ok) {

                    if (response.status === 401) {

                        throw new Error(
                            translations[currentLanguage]
                                .invalidKey
                        );

                    }


                    if (response.status === 404) {

                        throw new Error(
                            `${translations[currentLanguage].cityNotFound}`
                        );

                    }


                    if (response.status === 429) {

                        throw new Error(
                            translations[currentLanguage]
                                .apiLimit
                        );

                    }


                    throw new Error(
                        `Weather API error: ${response.status}`
                    );

                }


                const data =
                    await response.json();


                /* Temperature */

                if (temperature) {

                    temperature.textContent =
                        `${Math.round(data.main.temp)}°C`;

                }


                /* Description */

                if (description) {

                    description.textContent =
                        capitalize(
                            data.weather[0].description
                        );

                }


                /* Location */

                if (locationName) {

                    locationName.textContent =
                        `📍 ${data.name}, ${data.sys.country}`;

                }


                /* Humidity */

                if (humidity) {

                    humidity.textContent =
                        `${data.main.humidity}%`;

                }


                /* Wind */

                const windSpeed =
                    (
                        data.wind.speed * 3.6
                    ).toFixed(1);


                if (wind) {

                    wind.textContent =
                        `${windSpeed} km/h`;

                }


                /* Feels Like */

                if (feelsLike) {

                    feelsLike.textContent =
                        `${Math.round(
                            data.main.feels_like
                        )}°C`;

                }


                /* Minimum */

                if (minTemp) {

                    minTemp.textContent =
                        `${Math.round(
                            data.main.temp_min
                        )}°C`;

                }


                /* Maximum */

                if (maxTemp) {

                    maxTemp.textContent =
                        `${Math.round(
                            data.main.temp_max
                        )}°C`;

                }


                /* Clouds */

                if (clouds) {

                    clouds.textContent =
                        `${data.clouds.all}%`;

                }


                /* Visibility */

                if (visibility) {

                    visibility.textContent =
                        `${(
                            data.visibility / 1000
                        ).toFixed(1)} km`;

                }


                /* Weather Icon */

                if (weatherIcon) {

                    weatherIcon.textContent =
                        getWeatherEmoji(
                            data.weather[0].main
                        );

                }


                /* Rain */

                if (rain) {

                    if (
                        data.rain &&
                        data.rain["1h"] !== undefined
                    ) {

                        rain.textContent =
                            `${data.rain["1h"]} mm/h`;

                    } else {

                        rain.textContent =
                            translations[
                                currentLanguage
                            ].noRain;

                    }

                }


                /* Status */

                weatherStatus.textContent =
                    `${translations[currentLanguage].liveUpdated} ${data.name}`;


                /* Farming Tip */

                createFarmingTip(
                    data.weather[0].main,
                    data.main.humidity,
                    data.clouds.all
                );


                /* Forecast */

                await getForecast(
                    data.coord.lat,
                    data.coord.lon
                );


            } catch (error) {

                console.error(
                    "Weather Error:",
                    error
                );


                weatherStatus.textContent =
                    `❌ ${error.message}`;


                if (forecast) {

                    forecast.innerHTML = `

                        <div class="alert warning">

                            ${translations[
                                currentLanguage
                            ].unableForecast}

                        </div>

                    `;

                }

            }

        }


        /* =================================================
           FORECAST
        ================================================= */

        async function getForecast(
            lat,
            lon
        ) {

            try {

                if (forecast) {

                    forecast.innerHTML = `
                        <p>
                            🔄 Loading forecast...
                        </p>
                    `;

                }


                const url =
                    "https://api.openweathermap.org/data/2.5/forecast?" +
                    `lat=${lat}` +
                    `&lon=${lon}` +
                    `&appid=${API_KEY}` +
                    `&units=metric`;


                const response =
                    await fetch(url);


                if (!response.ok) {

                    throw new Error(
                        `Forecast API error: ${response.status}`
                    );

                }


                const data =
                    await response.json();


                const dailyData = {};


                data.list.forEach(item => {

                    const date =
                        new Date(
                            item.dt * 1000
                        );


                    const dateKey =
                        date.toLocaleDateString(
                            "en-CA"
                        );


                    if (
                        !dailyData[dateKey]
                    ) {

                        dailyData[dateKey] =
                            item;

                    }

                });


                const days =
                    Object.values(
                        dailyData
                    ).slice(0, 5);


                if (!forecast) return;


                forecast.innerHTML = "";


                days.forEach(item => {

                    const date =
                        new Date(
                            item.dt * 1000
                        );


                    const locale =
                        currentLanguage === "te"
                            ? "te-IN"
                            : "en-IN";


                    const day =
                        date.toLocaleDateString(
                            locale,
                            {
                                weekday: "short"
                            }
                        );


                    const dateText =
                        date.toLocaleDateString(
                            locale,
                            {
                                day: "numeric",
                                month: "short"
                            }
                        );


                    const temp =
                        Math.round(
                            item.main.temp
                        );


                    const condition =
                        item.weather[0].main;


                    const emoji =
                        getWeatherEmoji(
                            condition
                        );


                    const rainChance =
                        item.pop !== undefined
                            ? Math.round(
                                item.pop * 100
                            )
                            : 0;


                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "forecast-card";


                    card.innerHTML = `

                        <b>${day}</b>

                        <small>
                            ${dateText}
                        </small>

                        <div class="icon">
                            ${emoji}
                        </div>

                        <strong>
                            ${temp}°C
                        </strong>

                        <p>
                            ${capitalize(
                                item.weather[0]
                                    .description
                            )}
                        </p>

                        <small>
                            🌧️ ${rainChance}% 
                            ${translations[
                                currentLanguage
                            ].rainChance}
                        </small>

                    `;


                    forecast.appendChild(
                        card
                    );

                });


            } catch (error) {

                console.error(
                    "Forecast Error:",
                    error
                );


                if (forecast) {

                    forecast.innerHTML = `

                        <div class="alert warning">

                            ${translations[
                                currentLanguage
                            ].forecastUnavailable}

                        </div>

                    `;

                }

            }

        }


        /* =================================================
           FARMING RECOMMENDATION
        ================================================= */

        function createFarmingTip(
            condition,
            humidityValue,
            cloudiness
        ) {

            let message = "";


            if (
                condition === "Rain" ||
                condition === "Drizzle" ||
                condition === "Thunderstorm"
            ) {

                message =
                    currentLanguage === "te"
                        ? "🌧️ వర్షం గుర్తించబడింది. అవసరం లేని నీటిపారుదలను నివారించి పొలంలో నీటి పారుదలని తనిఖీ చేయండి."
                        : "🌧️ Rain detected. Avoid unnecessary irrigation and check field drainage.";

            }


            else if (
                humidityValue < 40
            ) {

                message =
                    currentLanguage === "te"
                        ? "💧 తేమ తక్కువగా ఉంది. నేల తేమను పర్యవేక్షించి అవసరమైతే నీటిపారుదల చేయండి."
                        : "💧 Humidity is low. Monitor soil moisture and consider irrigation if needed.";

            }


            else if (
                humidityValue > 80
            ) {

                message =
                    currentLanguage === "te"
                        ? "🌿 తేమ ఎక్కువగా ఉంది. పంటలకు ఫంగస్ వ్యాధులు మరియు అధిక తేమ సమస్యలను గమనించండి."
                        : "🌿 Humidity is high. Monitor crops for fungal disease and excess moisture.";

            }


            else if (
                cloudiness > 70
            ) {

                message =
                    currentLanguage === "te"
                        ? "☁️ మేఘావృతం ఎక్కువగా ఉంది. నీటిపారుదల చేయడానికి ముందు నేల తేమను తనిఖీ చేయండి."
                        : "☁️ Cloud cover is high. Check soil moisture before irrigation.";

            }


            else {

                message =
                    currentLanguage === "te"
                        ? "🌱 వాతావరణ పరిస్థితులు అనుకూలంగా ఉన్నాయి. మీ పంటలను పర్యవేక్షించడం కొనసాగించండి."
                        : "🌱 Weather conditions look suitable. Continue monitoring your crops.";

            }


            if (farmingTip) {

                farmingTip.textContent =
                    message;

            }

        }


        /* =================================================
           SEARCH BUTTON
        ================================================= */

        searchButton.addEventListener(
            "click",
            () => {

                const city =
                    cityInput.value.trim();


                if (!city) {

                    weatherStatus.textContent =
                        currentLanguage === "te"
                            ? "⚠️ దయచేసి నగరం పేరును నమోదు చేయండి."
                            : "⚠️ Please enter a city name.";

                    cityInput.focus();

                    return;

                }


                currentCity =
                    city;


                getCurrentWeather(
                    currentCity
                );

            }
        );


        /* =================================================
           ENTER KEY
        ================================================= */

        cityInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchButton.click();

                }

            }
        );


        /* =================================================
           LOGOUT
        ================================================= */

        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "farmerName"
                    );

                    window.location.href =
                        "index.html";

                }
            );

        }


        /* =================================================
           INITIAL LANGUAGE
        ================================================= */

        changeLanguage(
            currentLanguage
        );


        /* =================================================
           LOAD DEFAULT WEATHER
        ================================================= */

        getCurrentWeather(
            currentCity
        );

    }
);