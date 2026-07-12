// =========================
// Budget Bunny Website
// =========================

let weeklyBudget = 0;
let totalSpent = 0;

// =========================
// Smooth Fade-in Animation
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade");
    observer.observe(section);
});

// =========================
// Navbar Background
// =========================

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        nav.style.background = "#ffffffee";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
    } else {
        nav.style.background = "rgba(255,255,255,.85)";
        nav.style.boxShadow = "none";
    }
});

// =========================
// Floating Leaves
// =========================

for (let i = 0; i < 18; i++) {
    const leaf = document.createElement("div");

    leaf.innerHTML = "🍃";
    leaf.className = "leaf";
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.style.animationDuration = 6 + Math.random() * 6 + "s";
    leaf.style.fontSize = 18 + Math.random() * 18 + "px";

    document.body.appendChild(leaf);
}

// =========================
// Back To Top Button
// =========================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// =========================
// Budget Bunny Demo Chat
// =========================

function sendMessage() {
    const input = document.getElementById("expenseInput");
    const messages = document.getElementById("messages");

    if (!input || !messages) return;

    const text = input.value.trim();

    if (text === "") return;

    // Demo usage limit
    if (demoUsed === "true") {
        messages.innerHTML += `
            <div class="bot-message">
                🔒 Demo Limit Reached! 🐰<br><br>
                You have already tried Budget Bunny's demo version.<br><br>
                📱 Scan the Telegram QR code to continue using Budget Bunny for full expense tracking.
            </div>
        `;

        input.value = "";
        messages.scrollTop = messages.scrollHeight;

        return;
    }

    messages.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    input.value = "";

    let reply = "";

    const amount = text.match(/\$?(\d+(\.\d+)?)/);
    const value = amount ? Number(amount[1]) : 0;

    // First message sets weekly budget
    if (weeklyBudget === 0) {
        if (!isNaN(value) && value > 0) {
            weeklyBudget = value;

            reply = `
                ✅ <b>Weekly Budget Set!</b><br><br>
                💰 Weekly Budget: <b>$${weeklyBudget.toFixed(2)}</b><br><br>
                You can now start tracking your expenses.<br><br>
                Example:<br>
                <b>Spent $5 on chicken rice 🍗</b>
            `;
        } else {
            reply = `
                ❌ Please enter a valid weekly budget.<br><br>
                Example:<br>
                <b>50</b>
            `;
        }

        messages.innerHTML += `
            <div class="bot-message">
                ${reply}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;

        return;
    }

    // Add expense
    totalSpent += value;

    // Mark demo as completed after first expense
    localStorage.setItem("budgetBuddyDemoUsed", "true");
    demoUsed = "true";

    const remaining = weeklyBudget - totalSpent;

    let budgetAlert = "";

    if (remaining < 0) {
        budgetAlert = `
            <br>⚠️ <b>Overspending Alert!</b> 🚨<br>
            You have exceeded your weekly budget by 
            <b>$${Math.abs(remaining).toFixed(2)}</b>.<br>
            Try to reduce your spending for the rest of the week.
        `;
    } else if (remaining <= weeklyBudget * 0.2) {
        budgetAlert = `
            <br>⚠️ <b>Budget Reminder!</b><br>
            You are close to reaching your weekly limit. Spend carefully! 💰
        `;
    }

    reply = `
        ✅ <b>Expense Recorded!</b><br><br>
        💸 Amount: <b>$${value.toFixed(2)}</b><br>
        📊 Remaining Budget: <b>$${remaining.toFixed(2)}</b><br>
        ${budgetAlert}<br>
        🎉 Budget updated successfully!
    `;

    // Show typing animation
    messages.innerHTML += `
        <div class="bot-message typing" id="typing">
            🐰 Budget Bunny is typing<span class="dots"></span>
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const typing = document.getElementById("typing");

        if (typing) {
            typing.remove();
        }

        messages.innerHTML += `
            <div class="bot-message">
                ${reply}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;
    }, 1500);
}

// =========================
// Start Demo Button
// =========================

const startDemoBtn = document.getElementById("startDemoBtn");

if (startDemoBtn) {
    startDemoBtn.addEventListener("click", function () {
        setTimeout(() => {
            const input = document.getElementById("expenseInput");

            if (input) {
                input.focus();
            }
        }, 700);
    });
}

// =========================
// Welcome Message
// =========================

window.addEventListener("load", () => {
    const messages = document.getElementById("messages");

    if (!messages) return;

    setTimeout(() => {
        messages.innerHTML += `
            <div class="bot-message">
                👋 Welcome to Budget Bunny! 🐰<br><br>
                Before we start, what is your weekly food budget?<br><br>
                💰 Example:<br>
                <b>50</b>
            </div>
        `;
    }, 800);
});

// =========================
// Reset Demo Function
// Optional: for testing only
// =========================

function resetDemo() {
    localStorage.removeItem("budgetBuddyDemoUsed");
    demoUsed = false;
    weeklyBudget = 0;
    totalSpent = 0;

    const messages = document.getElementById("messages");

    if (messages) {
        messages.innerHTML = `
            <div class="bot-message">
                Demo has been reset! 🐰<br><br>
                Enter your weekly budget again to try Budget Bunny.
            </div>
        `;
    }
}
