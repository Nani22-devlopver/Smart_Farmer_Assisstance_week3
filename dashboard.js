/* =========================================
   SMART FARM DASHBOARD
   ENGLISH + TELUGU LANGUAGE SYSTEM
========================================= */


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        dashboard: "📊 Dashboard",

        cropPlanning: "🌱 Crop Planning",

        irrigation: "💧 Irrigation",

        weather: "🌦️ Weather",

        market: "💰 Market",

        records: "📒 Farm Records",

        logout: "Logout",

        language: "Language",

        farmerDashboard: "Farmer Dashboard",

        welcome: "Welcome back!",

        activeCrops: "Active Crops",

        soilMoisture: "Soil Moisture",

        today: "Today",

        marketAverage: "Market Avg.",

        cropOverview: "🌾 Crop Overview",

        smartAlerts: "🔔 Smart Alerts",

        soilAlert:
            "✓ Soil moisture is sufficient.",

        rainAlert:
            "⚠ Rain may occur tomorrow. Review irrigation.",

        marketAlert:
            "ℹ Tomato market price updated today.",

        quickActions: "⚡ Quick Actions",

        addCrop: "+ Add Crop",

        checkIrrigation:
            "💧 Check Irrigation",

        marketPrices:
            "₹ Market Prices",

        addRecord:
            "📒 Add Record"
    },


    te: {

        dashboard: "📊 డ్యాష్‌బోర్డ్",

        cropPlanning: "🌱 పంటల ప్రణాళిక",

        irrigation: "💧 నీటిపారుదల",

        weather: "🌦️ వాతావరణం",

        market: "💰 మార్కెట్",

        records: "📒 వ్యవసాయ రికార్డులు",

        logout: "లాగ్ అవుట్",

        language: "భాష",

        farmerDashboard:
            "రైతు డ్యాష్‌బోర్డ్",

        welcome:
            "తిరిగి స్వాగతం!",

        activeCrops:
            "ప్రస్తుతం ఉన్న పంటలు",

        soilMoisture:
            "నేల తేమ",

        today:
            "ఈ రోజు",

        marketAverage:
            "మార్కెట్ సగటు",

        cropOverview:
            "🌾 పంటల వివరాలు",

        smartAlerts:
            "🔔 ముఖ్యమైన హెచ్చరికలు",

        soilAlert:
            "✓ నేలలో తేమ సరిపడా ఉంది.",

        rainAlert:
            "⚠ రేపు వర్షం వచ్చే అవకాశం ఉంది. నీటిపారుదలని పరిశీలించండి.",

        marketAlert:
            "ℹ టమోటా మార్కెట్ ధర ఈరోజు నవీకరించబడింది.",

        quickActions:
            "⚡ త్వరిత చర్యలు",

        addCrop:
            "+ పంటను జోడించండి",

        checkIrrigation:
            "💧 నీటిపారుదలను తనిఖీ చేయండి",

        marketPrices:
            "₹ మార్కెట్ ధరలు",

        addRecord:
            "📒 రికార్డును జోడించండి"
    }

};


/* =========================================
   CHANGE LANGUAGE FUNCTION
========================================= */

function changeLanguage(language) {

    const elements =
        document.querySelectorAll("[data-lang]");

    elements.forEach(element => {

        const key =
            element.getAttribute("data-lang");

        if (translations[language][key]) {

            element.textContent =
                translations[language][key];

        }

    });


    /* Change HTML language */

    document.documentElement.lang =
        language === "te" ? "te" : "en";


    /* Change browser page title */

    if (language === "te") {

        document.title =
            "రైతు డ్యాష్‌బోర్డ్";

    } else {

        document.title =
            "SmartFarm Dashboard";

    }


    /* Save selected language */

    localStorage.setItem(
        "selectedLanguage",
        language
    );
}


/* =========================================
   LANGUAGE SELECT
========================================= */

const languageSelect =
    document.getElementById("languageSelect");


if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            changeLanguage(this.value);

        }
    );

}


/* =========================================
   LOAD SAVED LANGUAGE
========================================= */

const savedLanguage =
    localStorage.getItem("selectedLanguage") || "en";


if (languageSelect) {

    languageSelect.value =
        savedLanguage;

}


changeLanguage(savedLanguage);


/* =========================================
   DATE
========================================= */

const todayElement =
    document.getElementById("today");


if (todayElement) {

    const today = new Date();

    todayElement.textContent =
        today.toLocaleDateString(
            savedLanguage === "te"
                ? "te-IN"
                : "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

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

            localStorage.removeItem("farmerName");

            window.location.href =
                "index.html";

        }
    );

}


/* =========================================
   CROP DATA
========================================= */

const crops =
    JSON.parse(
        localStorage.getItem("crops") || "[]"
    );


const cropCount =
    document.getElementById("cropCount");


if (cropCount) {

    cropCount.textContent =
        crops.length;

}


/* =========================================
   CROP OVERVIEW
========================================= */

const cropOverview =
    document.getElementById("cropOverview");


if (cropOverview) {

    if (crops.length === 0) {

        cropOverview.innerHTML = `
            <p>
                🌱 No crops added yet.
            </p>
        `;

    } else {

        cropOverview.innerHTML =
            crops.map(crop => `
                <div class="crop-item">

                    <strong>
                        🌱 ${crop.name || "Crop"}
                    </strong>

                </div>
            `).join("");

    }

}



const chatBox = document.getElementById("aiChatBox");
const questionInput = document.getElementById("aiQuestion");
const sendButton = document.getElementById("aiSendButton");
const quickQuestions = document.querySelectorAll(".ai-question");

if (chatBox && questionInput && sendButton) {
    function escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function formatResponse(text) {
        let result = escapeHTML(text);
        result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        result = result.replace(/\n/g, "<br>");
        return result;
    }

    function addMessage(message, type) {
        const div = document.createElement("div");
        div.className = "ai-message " + type;

        const avatar = type === "bot" ? "🤖" : "👨‍🌾";
        div.innerHTML = `
            <div class="ai-avatar">${avatar}</div>
            <div class="ai-bubble">
                ${type === "bot" ? "<strong>AI Farmer Assistant</strong>" : ""}
                <div>
                    ${type === "bot" ? formatResponse(message) : escapeHTML(message)}
                </div>
            </div>
        `;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement("div");
        div.id = "typingIndicator";
        div.className = "ai-message bot";
        div.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="ai-bubble">
                <strong>AI Farmer Assistant</strong>
                <div class="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
    }

    async function sendQuestion() {
        const question = questionInput.value.trim();

        if (!question) {
            questionInput.focus();
            return;
        }

        addMessage(question, "user");
        questionInput.value = "";
        sendButton.disabled = true;
        sendButton.textContent = "…";
        showTyping();

        try {
            const language = localStorage.getItem("selectedLanguage") || "en";
            let crops = [];

            try {
                crops = JSON.parse(localStorage.getItem("crops") || "[]");
                if (!Array.isArray(crops)) crops = [];
            } catch {
                crops = [];
            }

            const response = await fetch("http://localhost:3000/api/farmer-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, language, crops })
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error("Invalid response from server.");
            }

            if (!response.ok) {
                throw new Error(data.error || "Server error");
            }

            if (!data.reply) {
                throw new Error("Gemini returned no response.");
            }

            removeTyping();
            addMessage(data.reply, "bot");
        } catch (error) {
            console.error(error);
            removeTyping();
            addMessage(
                "⚠️ AI connection failed.<br><br>" +
                escapeHTML(error.message) +
                "<br><br>Make sure the Node.js server is running.",
                "bot"
            );
        }

        sendButton.disabled = false;
        sendButton.textContent = "➤";
    }

    sendButton.addEventListener("click", sendQuestion);

    questionInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendQuestion();
        }
    });

    quickQuestions.forEach(function (button) {
        button.addEventListener("click", function () {
            questionInput.value = this.dataset.question;
            sendQuestion();
        });
    });
}

//CHATBOAT

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");

const chatMessages = document.getElementById("chatMessages");


// Open chatbot
chatToggle.addEventListener("click", function () {

    chatWindow.style.display = "flex";

    chatInput.focus();

});


// Close chatbot
closeChat.addEventListener("click", function () {

    chatWindow.style.display = "none";

});


// Send message
sendMessage.addEventListener("click", function () {

    sendChatMessage();

});


// Enter key
chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendChatMessage();

    }

});


function sendChatMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }


    // User message

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";

    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);


    // Clear input

    chatInput.value = "";


    // Scroll to bottom

    chatMessages.scrollTop = chatMessages.scrollHeight;


    // Demo bot response

    setTimeout(function () {

        const botMessage = document.createElement("div");

        botMessage.className = "bot-message";

        botMessage.innerHTML =
            "🌱 Thanks for your question! " +
            "SmartFarm AI can help you with crops, " +
            "irrigation, pests, fertilizers and farming.";

        chatMessages.appendChild(botMessage);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }, 800);

}
