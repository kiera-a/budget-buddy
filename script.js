// =========================
// Budget Buddy Website
// =========================

let weeklyBudget = 0;
let totalSpent = 0;
let demoUsed = localStorage.getItem("budgetBuddyDemoUsed") || false;

// Smooth Fade-in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll("section").forEach((section)=>{
    section.classList.add("fade");
    observer.observe(section);
});

// =========================
// Animated Number Counter
// =========================

const counters = document.querySelectorAll(".dashboard-card h1");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = Number(counter.innerText.replace("$",""));

        if(isNaN(target)) return;

        let current = 0;

        const increment = target / 80;

        const timer = setInterval(()=>{

            current += increment;

            if(current >= target){

                counter.innerHTML = "$" + target.toFixed(2);

                clearInterval(timer);

            }

            else{

                counter.innerHTML = "$" + current.toFixed(2);

            }

        },20);

    }

    updateCounter();

});

// =========================
// Progress Bar Animation
// =========================

window.addEventListener("load",()=>{

const progress=document.querySelector(".progress-bar");

progress.style.width="0%";

setTimeout(()=>{

progress.style.width="51%";

},300);

});

// =========================
// Navbar Background
// =========================

window.addEventListener("scroll",()=>{

const nav=document.querySelector("nav");

if(window.scrollY>50){

nav.style.background="#ffffffee";

nav.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

}

else{

nav.style.background="rgba(255,255,255,.85)";

nav.style.boxShadow="none";

}

});

// =========================
// Floating Leaves
// =========================

for(let i=0;i<18;i++){

const leaf=document.createElement("div");

leaf.innerHTML="🍃";

leaf.className="leaf";

leaf.style.left=Math.random()*100+"vw";

leaf.style.animationDuration=(6+Math.random()*6)+"s";

leaf.style.fontSize=(18+Math.random()*18)+"px";

document.body.appendChild(leaf);

}

// =========================
// Back To Top Button
// =========================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ===============================
// Budget Buddy Demo Chat
// ===============================

function sendMessage(){

const input=document.getElementById("expenseInput");

const messages=document.getElementById("messages");

const text=input.value.trim();

if(text==="") return;

// Demo usage limit
if (demoUsed === "true") {

    messages.innerHTML += `
    <div class="bot-message">
    🔒 Demo Limit Reached! 🐰<br><br>

    You have already tried Budget Buddy's demo version.<br><br>

    📱 Scan the Telegram QR code to continue using Budget Buddy for full expense tracking.
    </div>
    `;

    input.value = "";

    messages.scrollTop = messages.scrollHeight;

    return;
}

messages.innerHTML+=`

<div class="user-message">

${text}

</div>

`;

input.value="";

let reply="";

const lower=text.toLowerCase();

const amount=text.match(/\$?(\d+(\.\d+)?)/);

const value = amount ? Number(amount[1]) : 0;

// First message is the weekly budget
if (weeklyBudget === 0) {

    if (!isNaN(value) && value > 0) {

        weeklyBudget = value;

        updateDashboard();

        reply = `
✅ Weekly Budget Set!

💰 Weekly Budget: $${weeklyBudget.toFixed(2)}

You can now start tracking your expenses.

Example:

Spent $5 on chicken rice 🍗
`;

    } else {

        reply = `
❌ Please enter a valid weekly budget.

Example:

50
`;

    }

    // Show reply immediately
    messages.innerHTML += `
    <div class="bot-message">
        ${reply}
    </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    return;
}

totalSpent += value;

// Mark demo as completed after first expense
localStorage.setItem("budgetBuddyDemoUsed", true);
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
}
else if (remaining <= weeklyBudget * 0.2) {
    budgetAlert = `
    <br>⚠️ <b>Budget Reminder!</b><br>
    You are close to reaching your weekly limit. Spend carefully! 💰
    `;
}

reply=`
✅ Expense Recorded!<br><br>

Amount: $${value.toFixed(2)}<br>

📊 Remaining Budget: $${remaining.toFixed(2)}<br>

${budgetAlert}<br>

🎉 Budget Updated Successfully!
`;

// Show typing animation
messages.innerHTML += `
<div class="bot-message typing" id="typing">
    🐰 Budget Buddy is typing<span class="dots"></span>
</div>
`;

messages.scrollTop = messages.scrollHeight;

setTimeout(() => {

    document.getElementById("typing").remove();

    messages.innerHTML += `
    <div class="bot-message">
        ${reply}
    </div>
    `;

    messages.scrollTop = messages.scrollHeight;

}, 1500);

}

// Start Demo button
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

window.addEventListener("load", () => {

    const messages = document.getElementById("messages");

    if(!messages) return;

    setTimeout(() => {

        messages.innerHTML += `
        <div class="bot-message">
        👋 Welcome to Budget Buddy! 🐰
        Before we start,
        💰 What is your weekly budget?
        Example:
        50
        </div>
        `;

    },800);

});

function saveBudget(){

    const value = Number(document.getElementById("budgetInput").value);

    if(value <= 0){

        alert("Please enter a valid weekly budget.");

        return;

    }

    weeklyBudget = value;

    totalSpent = 0;

    updateDashboard();

    alert("Weekly budget saved!");

}

function updateDashboard(){

    document.getElementById("weeklyBudget").innerHTML =
        "$" + weeklyBudget.toFixed(2);

    document.getElementById("spentAmount").innerHTML =
        "$" + totalSpent.toFixed(2);

    document.getElementById("remainingBudget").innerHTML =
        "$" + (weeklyBudget - totalSpent).toFixed(2);

}