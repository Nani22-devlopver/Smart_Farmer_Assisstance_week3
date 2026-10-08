/* =========================================
   SMART FARM - IRRIGATION SYSTEM
   ENGLISH + TELUGU
========================================= */


/* =========================================
   TRANSLATIONS
========================================= */

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

        irrigationTitle:
            "💧 Irrigation Tracking",

        irrigationDescription:
            "Monitor water and control irrigation.",

        soilMoisture:
            "Soil Moisture",

        pumpStatus:
            "Pump Status",

        lastIrrigation:
            "Last Irrigation",

        smartPump:
            "Smart Pump Control",

        pumpDescription:
            "Turn the demo irrigation pump on or off.",

        pumpOn:
            "Turn Pump ON",

        pumpOff:
            "Turn Pump OFF",

        systemReady:
            "System is ready.",

        pumpRunning:
            "💧 Pump is running. Water is being supplied.",

        pumpStopped:
            "⛔ Pump is OFF. Irrigation has stopped."
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

        irrigationTitle:
            "💧 నీటిపారుదల పర్యవేక్షణ",

        irrigationDescription:
            "నీటిని పర్యవేక్షించి నీటిపారుదలను నియంత్రించండి.",

        soilMoisture:
            "నేల తేమ",

        pumpStatus:
            "పంప్ స్థితి",

        lastIrrigation:
            "చివరి నీటిపారుదల",

        smartPump:
            "స్మార్ట్ పంప్ నియంత్రణ",

        pumpDescription:
            "డెమో నీటిపారుదల పంప్‌ను ఆన్ లేదా ఆఫ్ చేయండి.",

        pumpOn:
            "పంప్‌ను ఆన్ చేయండి",

        pumpOff:
            "పంప్‌ను ఆఫ్ చేయండి",

        systemReady:
            "సిస్టమ్ సిద్ధంగా ఉంది.",

        pumpRunning:
            "💧 పంప్ నడుస్తోంది. నీరు సరఫరా అవుతోంది.",

        pumpStopped:
            "⛔ పంప్ ఆఫ్‌లో ఉంది. నీటిపారుదల ఆగిపోయింది."
    }

};


/* =========================================
   CURRENT LANGUAGE
========================================= */

let currentLanguage =
    localStorage.getItem("selectedLanguage") || "en";


/* =========================================
   PUMP STATE
========================================= */

let pumpIsOn =
    localStorage.getItem("pumpStatus") === "ON";


/* =========================================
   CHANGE LANGUAGE
========================================= */

function changeLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    /* Change all text */

    const elements =
        document.querySelectorAll("[data-lang]");


    elements.forEach(element => {

        const key =
            element.getAttribute("data-lang");


        if (
            translations[language] &&
            translations[language][key]
        ) {

            element.textContent =
                translations[language][key];

        }

    });


    /* Change HTML language */

    document.documentElement.lang =
        language === "te"
            ? "te"
            : "en";


    /* Change page title */

    document.title =
        language === "te"
            ? "నీటిపారుదల పర్యవేక్షణ"
            : "Irrigation Tracking";


    /* Update pump UI */

    updatePumpUI();

}


/* =========================================
   LANGUAGE SELECTOR
========================================= */

const languageSelect =
    document.getElementById(
        "languageSelect"
    );


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


/* =========================================
   PUMP ELEMENTS
========================================= */

const pumpBtn =
    document.getElementById(
        "pumpBtn"
    );


const pumpStatus =
    document.getElementById(
        "pumpStatus"
    );


const irrigationMessage =
    document.getElementById(
        "irrigationMessage"
    );


const waterProgress =
    document.getElementById(
        "waterProgress"
    );


/* =========================================
   UPDATE PUMP UI
========================================= */

function updatePumpUI() {

    const t =
        translations[currentLanguage];


    if (pumpIsOn) {

        /* Pump status */

        if (pumpStatus) {

            pumpStatus.textContent =
                "ON";

        }


        /* Button */

        if (pumpBtn) {

            pumpBtn.textContent =
                t.pumpOff;

        }


        /* Message */

        if (irrigationMessage) {

            irrigationMessage.textContent =
                t.pumpRunning;

        }


        /* Progress */

        if (waterProgress) {

            waterProgress.style.width =
                "82%";

        }

    }

    else {

        /* Pump status */

        if (pumpStatus) {

            pumpStatus.textContent =
                "OFF";

        }


        /* Button */

        if (pumpBtn) {

            pumpBtn.textContent =
                t.pumpOn;

        }


        /* Message */

        if (irrigationMessage) {

            irrigationMessage.textContent =
                t.pumpStopped;

        }


        /* Progress */

        if (waterProgress) {

            waterProgress.style.width =
                "68%";

        }

    }

}


/* =========================================
   PUMP BUTTON
========================================= */

if (pumpBtn) {

    pumpBtn.addEventListener(
        "click",
        function () {

            pumpIsOn =
                !pumpIsOn;


            /* Save pump state */

            localStorage.setItem(
                "pumpStatus",
                pumpIsOn
                    ? "ON"
                    : "OFF"
            );


            updatePumpUI();

        }
    );

}


/* =========================================
   LOGOUT
========================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "farmerName"
            );

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   INITIAL LOAD
========================================= */

changeLanguage(
    currentLanguage
);