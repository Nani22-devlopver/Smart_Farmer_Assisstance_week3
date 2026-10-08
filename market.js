/* =========================================================
   SMARTFARM
   APIFarmer COMMODITY MARKET PRICES
   ========================================================= */


/* =========================================================
   API CONFIGURATION
   ========================================================= */

// Get your API key from APIFarmer.
// DO NOT share your real API key publicly.

const API_KEY = "YOUR_APIFARMER_API_KEY";

const API_URL =
    "https://api.apifarmer.com/api/v0/commodities";


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let marketData = [];

let currentLanguage =
    localStorage.getItem("selectedLanguage") || "en";


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    en: {

        dashboard: "Dashboard",
        cropPlanning: "Crop Planning",
        irrigation: "Irrigation",
        weather: "Weather",
        market: "Market",
        farmRecords: "Farm Records",
        language: "Language",
        logout: "Logout",

        marketTitle:
            "💰 Agricultural Commodity Prices",

        marketDescription:
            "View current agricultural commodity prices.",

        selectMarket:
            "📍 Market Prices",

        district:
            "Commodity",

        mandi:
            "Symbol",

        crop:
            "Crop / Commodity",

        searchCrop:
            "Search commodity...",

        refresh:
            "Refresh Prices",

        priceInformation:
            "💰 Price Information",

        selectDistrict:
            "Select Commodity",

        selectMandi:
            "Select Symbol",

        selectCrop:
            "Select Crop",

        allPrices:
            "All Prices",

        loading:
            "🌾 Loading commodity prices...",

        noData:
            "No commodity data found.",

        apiError:
            "Unable to load commodity prices. Please check your API key or internet connection.",

        apiKeyError:
            "Please add your APIFarmer API key in market.js.",

        records:
            "records",

        cropName:
            "Commodity",

        marketName:
            "Symbol",

        districtName:
            "Currency",

        variety:
            "Unit",

        grade:
            "Date",

        minimumPrice:
            "Low",

        modalPrice:
            "Current Price",

        maximumPrice:
            "High",

        arrivalDate:
            "Time",

        refreshed:
            "Market prices refreshed successfully."

    },


    te: {

        dashboard:
            "డాష్‌బోర్డ్",

        cropPlanning:
            "పంట ప్రణాళిక",

        irrigation:
            "నీటిపారుదల",

        weather:
            "వాతావరణం",

        market:
            "మార్కెట్",

        farmRecords:
            "వ్యవసాయ రికార్డులు",

        language:
            "భాష",

        logout:
            "లాగ్ అవుట్",

        marketTitle:
            "💰 వ్యవసాయ కమోడిటీ ధరలు",

        marketDescription:
            "ప్రస్తుత వ్యవసాయ కమోడిటీ ధరలను చూడండి.",

        selectMarket:
            "📍 మార్కెట్ ధరలు",

        district:
            "కమోడిటీ",

        mandi:
            "సింబల్",

        crop:
            "పంట / కమోడిటీ",

        searchCrop:
            "కమోడిటీని వెతకండి...",

        refresh:
            "ధరలను రిఫ్రెష్ చేయండి",

        priceInformation:
            "💰 ధరల సమాచారం",

        selectDistrict:
            "కమోడిటీని ఎంచుకోండి",

        selectMandi:
            "సింబల్ ఎంచుకోండి",

        selectCrop:
            "పంటను ఎంచుకోండి",

        allPrices:
            "అన్ని ధరలు",

        loading:
            "🌾 కమోడిటీ ధరలు లోడ్ అవుతున్నాయి...",

        noData:
            "కమోడిటీ సమాచారం కనుగొనబడలేదు.",

        apiError:
            "కమోడిటీ ధరలు లోడ్ కాలేదు. API కీ లేదా ఇంటర్నెట్ కనెక్షన్‌ను తనిఖీ చేయండి.",

        apiKeyError:
            "market.js లో మీ APIFarmer API కీని జోడించండి.",

        records:
            "రికార్డులు",

        cropName:
            "కమోడిటీ",

        marketName:
            "సింబల్",

        districtName:
            "కరెన్సీ",

        variety:
            "యూనిట్",

        grade:
            "తేదీ",

        minimumPrice:
            "కనిష్ఠ ధర",

        modalPrice:
            "ప్రస్తుత ధర",

        maximumPrice:
            "గరిష్ఠ ధర",

        arrivalDate:
            "సమయం",

        refreshed:
            "మార్కెట్ ధరలు విజయవంతంగా రిఫ్రెష్ అయ్యాయి."

    }

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const languageSelect =
    document.getElementById("languageSelect");

const districtSelect =
    document.getElementById("districtSelect");

const marketSelect =
    document.getElementById("marketSelect");

const cropSelect =
    document.getElementById("cropSelect");

const marketSearch =
    document.getElementById("marketSearch");

const refreshMarket =
    document.getElementById("refreshMarket");

const marketTable =
    document.getElementById("marketTable");

const marketStatus =
    document.getElementById("marketStatus");

const lastUpdated =
    document.getElementById("lastUpdated");

const recordCount =
    document.getElementById("recordCount");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =========================================================
   TRANSLATION HELPER
   ========================================================= */

function t(key) {

    return (
        translations[currentLanguage] &&
        translations[currentLanguage][key]
    ) || key;

}


/* =========================================================
   LANGUAGE SYSTEM
   ========================================================= */

function applyLanguage() {

    languageSelect.value =
        currentLanguage;


    document
        .querySelectorAll("[data-lang]")
        .forEach(element => {

            const key =
                element.getAttribute("data-lang");

            if (
                translations[currentLanguage] &&
                translations[currentLanguage][key]
            ) {

                element.textContent =
                    translations[currentLanguage][key];

            }

        });


    document
        .querySelectorAll("[data-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute(
                    "data-placeholder"
                );

            if (
                translations[currentLanguage] &&
                translations[currentLanguage][key]
            ) {

                element.placeholder =
                    translations[currentLanguage][key];

            }

        });


    document.documentElement.lang =
        currentLanguage;


    document.title =
        currentLanguage === "te"
            ? "మార్కెట్ సమాచారం"
            : "Market Information";


    populateCommodityDropdown();

    populateSymbolDropdown();

    filterAndDisplayData();

}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

languageSelect.addEventListener(
    "change",
    function () {

        currentLanguage =
            this.value;

        localStorage.setItem(
            "selectedLanguage",
            currentLanguage
        );

        applyLanguage();

    }
);


/* =========================================================
   BUILD APIFARMER URL
   ========================================================= */

function buildAPIURL() {

    const url =
        new URL(API_URL);

    url.searchParams.set(
        "api-key",
        API_KEY
    );

    return url.toString();

}


/* =========================================================
   FETCH APIFARMER MARKET DATA
   ========================================================= */

async function fetchMarketPrices() {

    if (
        !API_KEY ||
        API_KEY === "YOUR_APIFARMER_API_KEY"
    ) {

        marketStatus.textContent =
            t("apiKeyError");

        marketTable.innerHTML = `
            <div class="error-message">
                🔑 ${t("apiKeyError")}
            </div>
        `;

        return;

    }


    marketStatus.textContent =
        t("loading");


    marketTable.innerHTML = `
        <div class="loading">
            🌾 ${t("loading")}
        </div>
    `;


    try {

        const response =
            await fetch(
                buildAPIURL()
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "APIFarmer Response:",
            result
        );


        /*
         * APIFarmer documentation shows
         * commodity data in the "data" object.
         *
         * Some API versions may return an array,
         * so both formats are supported.
         */

        let records =
            Array.isArray(result.data)
                ? result.data
                : result.data
                    ? [result.data]
                    : [];


        marketData =
            records
                .map(convertAPIRecord)
                .filter(
                    record =>
                        record.crop
                );


        recordCount.textContent =
            marketData.length;


        populateCommodityDropdown();

        populateSymbolDropdown();

        filterAndDisplayData();


        marketStatus.textContent =
            `${marketData.length} ${t("records")}`;


        lastUpdated.textContent =
            `🔄 ${new Date().toLocaleString(
                currentLanguage === "te"
                    ? "te-IN"
                    : "en-IN"
            )}`;

    }

    catch (error) {

        console.error(
            "APIFarmer API Error:",
            error
        );


        marketStatus.textContent =
            t("apiError");


        marketTable.innerHTML = `
            <div class="error-message">
                ⚠️ ${t("apiError")}
                <br><br>
                <small>
                    ${error.message}
                </small>
            </div>
        `;


        recordCount.textContent =
            "0";

    }

}


/* =========================================================
   CONVERT APIFARMER RECORD
   ========================================================= */

function convertAPIRecord(record) {

    return {

        crop:
            String(
                record.commodity || ""
            ).trim(),

        symbol:
            String(
                record.symbol || "-"
            ).trim(),

        currency:
            String(
                record.currency || "USD"
            ).trim(),

        unit:
            String(
                record.unit || "-"
            ).trim(),

        date:
            record.date || "",

        time:
            record.time || "",

        price:
            Number(
                record.price || 0
            ),

        low:
            Number(
                record.low || 0
            ),

        high:
            Number(
                record.high || 0
            ),

        open:
            Number(
                record.open || 0
            ),

        close:
            Number(
                record.close || 0
            ),

        dailyChange:
            Number(
                record.daily_change || 0
            ),

        weeklyChange:
            Number(
                record.weekly_change || 0
            ),

        monthlyChange:
            Number(
                record.monthly_change || 0
            )

    };

}


/* =========================================================
   COMMODITY DROPDOWN
   ========================================================= */

function populateCommodityDropdown() {

    if (!cropSelect) {
        return;
    }


    const selected =
        cropSelect.value;


    const commodities =
        [
            ...new Set(
                marketData
                    .map(
                        item => item.crop
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    cropSelect.innerHTML = `
        <option value="">
            ${t("allPrices")}
        </option>
    `;


    commodities.forEach(
        commodity => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                commodity;

            option.textContent =
                commodity;


            cropSelect.appendChild(
                option
            );

        }
    );


    cropSelect.disabled =
        commodities.length === 0;


    if (
        commodities.includes(selected)
    ) {

        cropSelect.value =
            selected;

    }

}


/* =========================================================
   SYMBOL DROPDOWN
   ========================================================= */

function populateSymbolDropdown() {

    if (!marketSelect) {
        return;
    }


    const selected =
        marketSelect.value;


    const symbols =
        [
            ...new Set(
                marketData
                    .map(
                        item => item.symbol
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    marketSelect.innerHTML = `
        <option value="">
            ${t("allPrices")}
        </option>
    `;


    symbols.forEach(
        symbol => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                symbol;

            option.textContent =
                symbol;


            marketSelect.appendChild(
                option
            );

        }
    );


    marketSelect.disabled =
        symbols.length === 0;


    if (
        symbols.includes(selected)
    ) {

        marketSelect.value =
            selected;

    }

}


/* =========================================================
   DISTRICT SELECTOR
   APIFarmer DOES NOT DOCUMENT DISTRICT DATA
   ========================================================= */

if (districtSelect) {

    districtSelect.innerHTML = `
        <option value="">
            ${t("allPrices")}
        </option>
    `;

    districtSelect.disabled = true;

}


/* =========================================================
   MARKET / SYMBOL CHANGE
   ========================================================= */

marketSelect.addEventListener(
    "change",
    function () {

        filterAndDisplayData();

    }
);


/* =========================================================
   CROP CHANGE
   ========================================================= */

cropSelect.addEventListener(
    "change",
    function () {

        filterAndDisplayData();

    }
);


/* =========================================================
   SEARCH
   ========================================================= */

marketSearch.addEventListener(
    "input",
    function () {

        filterAndDisplayData();

    }
);


/* =========================================================
   FILTER DATA
   ========================================================= */

function filterAndDisplayData() {

    const commodity =
        cropSelect.value;


    const symbol =
        marketSelect.value;


    const search =
        marketSearch.value
            .trim()
            .toLowerCase();


    let filtered =
        marketData;


    if (commodity) {

        filtered =
            filtered.filter(
                item =>
                    item.crop === commodity
            );

    }


    if (symbol) {

        filtered =
            filtered.filter(
                item =>
                    item.symbol === symbol
            );

    }


    if (search) {

        filtered =
            filtered.filter(
                item => {

                    return (

                        item.crop
                            .toLowerCase()
                            .includes(search)

                        ||

                        item.symbol
                            .toLowerCase()
                            .includes(search)

                    );

                }
            );

    }


    renderMarketTable(
        filtered
    );

}


/* =========================================================
   RENDER TABLE
   ========================================================= */

function renderMarketTable(data) {

    recordCount.textContent =
        data.length;


    if (!data.length) {

        marketTable.innerHTML = `

            <div class="empty-message">

                🌾

                <h3>
                    ${t("noData")}
                </h3>

                <p>
                    ${t("searchCrop")}
                </p>

            </div>

        `;

        return;

    }


    let html = `

        <table>

            <thead>

                <tr>

                    <th>
                        ${t("cropName")}
                    </th>

                    <th>
                        ${t("marketName")}
                    </th>

                    <th>
                        ${t("districtName")}
                    </th>

                    <th>
                        ${t("variety")}
                    </th>

                    <th>
                        ${t("minimumPrice")}
                    </th>

                    <th>
                        ${t("modalPrice")}
                    </th>

                    <th>
                        ${t("maximumPrice")}
                    </th>

                    <th>
                        ${t("arrivalDate")}
                    </th>

                </tr>

            </thead>

            <tbody>

    `;


    data.forEach(
        item => {

            html += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHTML(
                                item.crop
                            )}
                        </strong>
                    </td>


                    <td>
                        ${escapeHTML(
                            item.symbol
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            item.currency
                        )}
                    </td>


                    <td>
                        ${escapeHTML(
                            item.unit
                        )}
                    </td>


                    <td class="price minimum">

                        ${formatCurrency(
                            item.low,
                            item.currency
                        )}

                    </td>


                    <td class="price modal">

                        ${formatCurrency(
                            item.price,
                            item.currency
                        )}

                    </td>


                    <td class="price maximum">

                        ${formatCurrency(
                            item.high,
                            item.currency
                        )}

                    </td>


                    <td>

                        ${formatDate(
                            item.date
                        )}

                        ${
                            item.time
                                ? `<br><small>${escapeHTML(item.time)} UTC</small>`
                                : ""
                        }

                    </td>

                </tr>

            `;

        }
    );


    html += `

            </tbody>

        </table>

    `;


    marketTable.innerHTML =
        html;

}


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

function formatCurrency(
    value,
    currency
) {

    if (
        value === null ||
        value === undefined ||
        isNaN(value)
    ) {

        return "-";

    }


    return Number(value)
        .toLocaleString(
            "en-US",
            {
                style: "currency",
                currency:
                    currency || "USD"
            }
        );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "-";

    }


    const date =
        new Date(dateValue);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return dateValue;

    }


    return date.toLocaleDateString(
        currentLanguage === "te"
            ? "te-IN"
            : "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* =========================================================
   REFRESH
   ========================================================= */

refreshMarket.addEventListener(
    "click",
    function () {

        fetchMarketPrices();

    }
);


/* =========================================================
   LOGOUT
   ========================================================= */

logoutBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "smartFarmLoggedIn"
        );

        window.location.href =
            "index.html";

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

applyLanguage();

fetchMarketPrices();


/* =========================================================
   AUTO REFRESH
   Every 10 minutes
   ========================================================= */

setInterval(
    fetchMarketPrices,
    10 * 60 * 1000
);