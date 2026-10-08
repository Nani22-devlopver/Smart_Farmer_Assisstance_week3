/* SmartFarm AI Farmer Assistant - frontend */
(() => {
    "use strict";

    const chatBox = document.getElementById("aiChatBox");
    const questionInput = document.getElementById("aiQuestion");
    const sendButton = document.getElementById("aiSendButton");
    const quickQuestions = document.querySelectorAll(".ai-question");

    if (!chatBox || !questionInput || !sendButton) {
        console.error("SmartFarm chatbot: required HTML elements were not found.");
        return;
    }

    function escapeHTML(value) {
        const div = document.createElement("div");
        div.textContent = String(value ?? "");
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
        div.className = `ai-message ${type}`;

        const avatar = type === "bot" ? "🤖" : "👨‍🌾";
        const content = type === "bot"
            ? formatResponse(message)
            : escapeHTML(message);

        div.innerHTML = `
            <div class="ai-avatar">${avatar}</div>
            <div class="ai-bubble">
                ${type === "bot" ? "<strong>AI Farmer Assistant</strong>" : ""}
                <div>${content}</div>
            </div>
        `;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTyping() {
        removeTyping();

        const div = document.createElement("div");
        div.id = "typingIndicator";
        div.className = "ai-message bot";
        div.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="ai-bubble">
                <strong>AI Farmer Assistant</strong>
                <div class="ai-typing">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;

        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTyping() {
        document.getElementById("typingIndicator")?.remove();
    }

    function getSavedCrops() {
        try {
            const crops = JSON.parse(localStorage.getItem("crops") || "[]");
            return Array.isArray(crops) ? crops : [];
        } catch {
            return [];
        }
    }

    async function sendQuestion() {
        const question = questionInput.value.trim();

        if (!question || sendButton.disabled) {
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

            const response = await fetch("/api/farmer-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question,
                    language,
                    crops: getSavedCrops()
                })
            });

            const contentType = response.headers.get("content-type") || "";
            let data;

            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(
                    response.ok
                        ? "The server returned an unexpected response."
                        : `Server error (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(data?.error || `Server error (${response.status}).`);
            }

            if (!data?.reply) {
                throw new Error("The AI returned an empty response.");
            }

            removeTyping();
            addMessage(data.reply, "bot");
        } catch (error) {
            console.error("SmartFarm chatbot error:", error);
            removeTyping();

            let message = error.message || "Unknown error.";
            if (message.includes("Failed to fetch")) {
                message = "Cannot connect to the SmartFarm server. Start the Node.js server and open the chatbot through http://localhost:3000.";
            }

            addMessage(`⚠️ ${message}`, "bot");
        } finally {
            sendButton.disabled = false;
            sendButton.textContent = "➤";
            questionInput.focus();
        }
    }

    sendButton.addEventListener("click", sendQuestion);

    questionInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendQuestion();
        }
    });

    quickQuestions.forEach((button) => {
        button.addEventListener("click", () => {
            questionInput.value = button.dataset.question || "";
            sendQuestion();
        });
    });
})();
