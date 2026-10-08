/* =========================================
   SMART FARM - FARM RECORDS
   ENGLISH / TELUGU LANGUAGE SYSTEM
========================================= */


/* =========================================
   LANGUAGE
========================================= */

let currentLanguage =
    localStorage.getItem("selectedLanguage") || "en";


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        language: "Language",

        dashboard: "Dashboard",

        cropPlanning: "Crop Planning",

        irrigation: "Irrigation",

        weather: "Weather",

        market: "Market",

        farmRecords: "Farm Records",

        logout: "Logout",

        recordsSubtitle:
            "Track farm expenses and income.",

        itemActivity:
            "Item / activity",

        amount:
            "Amount ₹",

        expense:
            "Expense",

        income:
            "Income",

        addRecord:
            "Add Record",

        totalExpenses:
            "Total Expenses",

        totalIncome:
            "Total Income",

        balance:
            "Balance",

        records:
            "Records",

        noRecords:
            "No records available.",

        item:
            "Item / Activity",

        type:
            "Type",

        recordAmount:
            "Amount",

        date:
            "Date",

        action:
            "Action",

        delete:
            "Delete",

        expenseText:
            "Expense",

        incomeText:
            "Income",

        recordAdded:
            "Record added successfully.",

        confirmDelete:
            "Are you sure you want to delete this record?",

        deleted:
            "Record deleted."

    },


    te: {

        language: "భాష",

        dashboard: "డాష్‌బోర్డ్",

        cropPlanning: "పంట ప్రణాళిక",

        irrigation: "నీటిపారుదల",

        weather: "వాతావరణం",

        market: "మార్కెట్",

        farmRecords: "వ్యవసాయ రికార్డులు",

        logout: "లాగ్ అవుట్",

        recordsSubtitle:
            "వ్యవసాయ ఖర్చులు మరియు ఆదాయాన్ని నమోదు చేయండి.",

        itemActivity:
            "వస్తువు / కార్యకలాపం",

        amount:
            "మొత్తం ₹",

        expense:
            "ఖర్చు",

        income:
            "ఆదాయం",

        addRecord:
            "రికార్డ్ జోడించండి",

        totalExpenses:
            "మొత్తం ఖర్చులు",

        totalIncome:
            "మొత్తం ఆదాయం",

        balance:
            "మిగులు",

        records:
            "రికార్డులు",

        noRecords:
            "రికార్డులు అందుబాటులో లేవు.",

        item:
            "వస్తువు / కార్యకలాపం",

        type:
            "రకం",

        recordAmount:
            "మొత్తం",

        date:
            "తేదీ",

        action:
            "చర్య",

        delete:
            "తొలగించండి",

        expenseText:
            "ఖర్చు",

        incomeText:
            "ఆదాయం",

        recordAdded:
            "రికార్డు విజయవంతంగా జోడించబడింది.",

        confirmDelete:
            "ఈ రికార్డును తొలగించాలా?",

        deleted:
            "రికార్డు తొలగించబడింది."

    }

};



/* =========================================
   GET TRANSLATION
========================================= */

function translate(key) {

    return translations[currentLanguage][key] ||
           translations.en[key] ||
           key;

}



/* =========================================
   CHANGE PAGE LANGUAGE
========================================= */

function changeLanguage(language) {

    currentLanguage = language;

    /* Save selected language */
    localStorage.setItem(
        "selectedLanguage",
        language
    );


    /* Change normal text */
    document
        .querySelectorAll("[data-lang]")
        .forEach(element => {

            const key =
                element.getAttribute("data-lang");

            element.textContent =
                translate(key);

        });


    /* Change placeholders */
    document
        .querySelectorAll("[data-placeholder]")
        .forEach(element => {

            const key =
                element.getAttribute("data-placeholder");

            element.placeholder =
                translate(key);

        });


    /* Change HTML language */
    document.documentElement.lang =
        language;


    /* Change page title */

    document.title =
        language === "te"
            ? "వ్యవసాయ రికార్డులు"
            : "Farm Records";


    /* Re-render records */
    displayRecords();

}



/* =========================================
   LANGUAGE SELECT
========================================= */

const languageSelect =
    document.getElementById("languageSelect");


if (languageSelect) {

    languageSelect.value =
        currentLanguage;


    languageSelect.addEventListener(
        "change",
        function () {

            changeLanguage(this.value);

        }
    );

}



/* =========================================
   FARM RECORD DATA
========================================= */

let records =
    JSON.parse(
        localStorage.getItem("farmRecords")
    ) || [];



/* =========================================
   SAVE RECORDS
========================================= */

function saveRecords() {

    localStorage.setItem(
        "farmRecords",
        JSON.stringify(records)
    );

}



/* =========================================
   FORM SUBMIT
========================================= */

const recordForm =
    document.getElementById("recordForm");


recordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const item =
            document
                .getElementById("recordItem")
                .value
                .trim();


        const type =
            document
                .getElementById("recordType")
                .value;


        const amount =
            Number(
                document
                    .getElementById("recordAmount")
                    .value
            );


        const date =
            document
                .getElementById("recordDate")
                .value;



        /* Validate */
        if (
            !item ||
            !amount ||
            amount <= 0 ||
            !date
        ) {

            return;

        }



        /* Create record */

        const newRecord = {

            id: Date.now(),

            item: item,

            type: type,

            amount: amount,

            date: date

        };


        /* Add record */

        records.push(newRecord);


        /* Save */

        saveRecords();


        /* Display */

        displayRecords();


        /* Reset form */

        recordForm.reset();

    }
);



/* =========================================
   DISPLAY RECORDS
========================================= */

function displayRecords() {

    const recordList =
        document.getElementById("recordList");


    /* No records */

    if (records.length === 0) {

        recordList.innerHTML = `
            <p class="empty-message">
                ${translate("noRecords")}
            </p>
        `;

        updateTotals();

        return;

    }



    /* Table */

    let tableHTML = `

        <table>

            <thead>

                <tr>

                    <th>
                        ${translate("item")}
                    </th>

                    <th>
                        ${translate("type")}
                    </th>

                    <th>
                        ${translate("recordAmount")}
                    </th>

                    <th>
                        ${translate("date")}
                    </th>

                    <th>
                        ${translate("action")}
                    </th>

                </tr>

            </thead>

            <tbody>
    `;



    /* Records */

    records.forEach(record => {

        const translatedType =
            record.type === "Expense"
                ? translate("expenseText")
                : translate("incomeText");


        tableHTML += `

            <tr>

                <td>
                    ${record.item}
                </td>

                <td>
                    ${translatedType}
                </td>

                <td>
                    ₹${Number(record.amount).toLocaleString("en-IN")}
                </td>

                <td>
                    ${record.date}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteRecord(${record.id})"
                    >

                        ${translate("delete")}

                    </button>

                </td>

            </tr>

        `;

    });



    tableHTML += `

            </tbody>

        </table>

    `;


    recordList.innerHTML =
        tableHTML;


    /* Update totals */

    updateTotals();

}



/* =========================================
   DELETE RECORD
========================================= */

function deleteRecord(id) {

    if (
        !confirm(
            translate("confirmDelete")
        )
    ) {

        return;

    }


    records =
        records.filter(
            record =>
                record.id !== id
        );


    saveRecords();

    displayRecords();

}



/* =========================================
   CALCULATE TOTALS
========================================= */

function updateTotals() {

    let totalExpenses = 0;

    let totalIncome = 0;


    records.forEach(record => {

        if (record.type === "Expense") {

            totalExpenses +=
                Number(record.amount);

        }


        if (record.type === "Income") {

            totalIncome +=
                Number(record.amount);

        }

    });


    const balance =
        totalIncome - totalExpenses;



    /* Display */

    document.getElementById(
        "expenseTotal"
    ).textContent =
        `₹${totalExpenses.toLocaleString("en-IN")}`;


    document.getElementById(
        "incomeTotal"
    ).textContent =
        `₹${totalIncome.toLocaleString("en-IN")}`;


    document.getElementById(
        "profitTotal"
    ).textContent =
        `₹${balance.toLocaleString("en-IN")}`;

}



/* =========================================
   LOGOUT
========================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

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

}



/* =========================================
   INITIAL LOAD
========================================= */

changeLanguage(currentLanguage);