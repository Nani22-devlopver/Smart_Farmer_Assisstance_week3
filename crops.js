/* =========================================
   SMART FARM - CROP PLANNING
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

        cropPlanningTitle:
            "🌱 Crop Planning",

        cropPlanningDescription:
            "Plan and monitor your crops.",

        cropName:
            "Crop name",

        area:
            "Area (acres)",

        planned:
            "Planned",

        growing:
            "Growing",

        flowering:
            "Flowering",

        readyHarvest:
            "Ready to Harvest",

        addCrop:
            "Add Crop",

        myCrops:
            "My Crops",

        crop:
            "Crop",

        acres:
            "Acres",

        sowingDate:
            "Sowing Date",

        stage:
            "Stage",

        actions:
            "Actions",

        delete:
            "Delete",

        noCrops:
            "🌱 No crops added yet.",

        cropAdded:
            "Crop added successfully.",

        cropDeleted:
            "Crop deleted successfully."
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

        cropPlanningTitle:
            "🌱 పంటల ప్రణాళిక",

        cropPlanningDescription:
            "మీ పంటలను ప్రణాళిక చేయండి మరియు పర్యవేక్షించండి.",

        cropName:
            "పంట పేరు",

        area:
            "విస్తీర్ణం (ఎకరాలు)",

        planned:
            "ప్రణాళికలో ఉంది",

        growing:
            "పెరుగుతోంది",

        flowering:
            "పుష్పించే దశ",

        readyHarvest:
            "కోతకు సిద్ధంగా ఉంది",

        addCrop:
            "పంటను జోడించండి",

        myCrops:
            "నా పంటలు",

        crop:
            "పంట",

        acres:
            "ఎకరాలు",

        sowingDate:
            "విత్తిన తేదీ",

        stage:
            "దశ",

        actions:
            "చర్యలు",

        delete:
            "తొలగించండి",

        noCrops:
            "🌱 ఇంకా పంటలు జోడించలేదు.",

        cropAdded:
            "పంట విజయవంతంగా జోడించబడింది.",

        cropDeleted:
            "పంట విజయవంతంగా తొలగించబడింది."
    }

};


/* =========================================
   GET CURRENT LANGUAGE
========================================= */

let currentLanguage =
    localStorage.getItem("selectedLanguage") || "en";


/* =========================================
   LANGUAGE FUNCTION
========================================= */

function changeLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
        "selectedLanguage",
        language
    );


    /* Change normal text */

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


    /* Change input placeholders */

    const placeholderElements =
        document.querySelectorAll(
            "[data-placeholder]"
        );


    placeholderElements.forEach(element => {

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

    });


    /* Change page language */

    document.documentElement.lang =
        language === "te" ? "te" : "en";


    /* Change page title */

    document.title =
        language === "te"
            ? "పంటల ప్రణాళిక"
            : "Crop Planning";


    /* Update crop table */

    displayCrops();

}


/* =========================================
   LANGUAGE SELECT
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
   CROP FORM
========================================= */

const cropForm =
    document.getElementById("cropForm");


/* =========================================
   GET CROPS FROM LOCAL STORAGE
========================================= */

let crops =
    JSON.parse(
        localStorage.getItem("crops") || "[]"
    );


/* =========================================
   ADD CROP
========================================= */

if (cropForm) {

    cropForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const cropName =
                document
                    .getElementById("cropName")
                    .value
                    .trim();


            const area =
                document
                    .getElementById("area")
                    .value;


            const sowingDate =
                document
                    .getElementById("sowingDate")
                    .value;


            const stage =
                document
                    .getElementById("stage")
                    .value;


            if (
                !cropName ||
                !area ||
                !sowingDate
            ) {

                return;

            }


            const newCrop = {

                id: Date.now(),

                name: cropName,

                area: area,

                sowingDate: sowingDate,

                stage: stage

            };


            crops.push(newCrop);


            localStorage.setItem(
                "crops",
                JSON.stringify(crops)
            );


            cropForm.reset();


            displayCrops();


            alert(
                translations[currentLanguage]
                    .cropAdded
            );

        }
    );

}


/* =========================================
   DISPLAY CROPS
========================================= */

function displayCrops() {

    const cropList =
        document.getElementById(
            "cropList"
        );


    if (!cropList) return;


    const t =
        translations[currentLanguage];


    if (crops.length === 0) {

        cropList.innerHTML = `
            <p class="empty-message">
                ${t.noCrops}
            </p>
        `;

        return;

    }


    cropList.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>${t.crop}</th>

                    <th>${t.acres}</th>

                    <th>${t.sowingDate}</th>

                    <th>${t.stage}</th>

                    <th>${t.actions}</th>

                </tr>

            </thead>

            <tbody>

                ${crops.map(crop => `

                    <tr>

                        <td>
                            🌱 ${crop.name}
                        </td>

                        <td>
                            ${crop.area}
                        </td>

                        <td>
                            ${crop.sowingDate}
                        </td>

                        <td>
                            ${getStageText(crop.stage)}
                        </td>

                        <td>

                            <button
                                class="delete-btn"
                                onclick="deleteCrop(${crop.id})">
                                🗑️ ${t.delete}
                            </button>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>
    `;
}


/* =========================================
   STAGE TRANSLATION
========================================= */

function getStageText(stage) {

    const t =
        translations[currentLanguage];


    const stageMap = {

        "Planned":
            t.planned,

        "Growing":
            t.growing,

        "Flowering":
            t.flowering,

        "Ready to Harvest":
            t.readyHarvest

    };


    return (
        stageMap[stage] ||
        stage
    );
}


/* =========================================
   DELETE CROP
========================================= */

function deleteCrop(id) {

    const confirmed =
        confirm(
            currentLanguage === "te"
                ? "ఈ పంటను తొలగించాలనుకుంటున్నారా?"
                : "Do you want to delete this crop?"
        );


    if (!confirmed) return;


    crops =
        crops.filter(
            crop => crop.id !== id
        );


    localStorage.setItem(
        "crops",
        JSON.stringify(crops)
    );


    displayCrops();


    alert(
        translations[currentLanguage]
            .cropDeleted
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
        function() {

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