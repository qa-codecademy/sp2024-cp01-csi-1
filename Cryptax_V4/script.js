import {LoadCurrentUser, SaveCurrentUser} from './userDb.js';

let displayTrendingWinners = document.getElementById("displayTrendingWinners")
let displayTrendingLosers = document.getElementById("displayTrendingLosers")
let navUi = document.getElementById("nav_ui")

//CURRENT USER
let currentUser = LoadCurrentUser();
console.log(currentUser);

if (currentUser != null) {
    navUi.innerHTML = `
     <div>
                <div class="nav_bar">
                    <div><a href="homepage.html" class="navLinks" >HOME</a></div>
                    <div><a href="statisticsPage.html" class="navLinks" >STATISTICS</a></div>
                    <div><a href="simulator.html" class="navLinks" >SIMULATOR</a></div>
                    <div><a href="aboutUs.html" class="navLinks" >ABOUT US</a></div>
                </div>
            </div>
            <div id="loggedIn">
            <div id="userDisplay">Welcome ${currentUser.username}</div>
                <a href="homepage.html"><button class="navButtons" id="logout_btn">Log out</button></a>
                </div>
                `
}
else {
    navUi.innerHTML = `
                <div>
                <div class="nav_bar">
                <div><a href="homepage.html" class="navLinks" >HOME</a></div>
                <div><a href="statisticsPage.html" class="navLinks" >STATISTICS</a></div>
                <div><a href="loginPage.html" class="navLinks" >SIMULATOR</a></div>
                <div><a href="aboutUs.html" class="navLinks" >ABOUT US</a></div>
                </div>
                </div>
                <div class="nav_login_register_btn">
                <a href="loginPage.html"><button class="navButtons"  id="login_btn">Log In</button></a>
                <a href="registerPage.html"><button class="navButtons" id="register_btn">Sign Up</button></a>
            </div>
    `
}


//  TYPEWRITE EFFECT
const typewriteLoop = new Typed(".auto-type", {
    strings: ["Bitcoin", "Ethereum", "Doge", "CrypTax"],
    typeSpeed: 70,
    backSpeed: 85,
})

// COUNTER EFFECT
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;
valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
});

// REVEAL ON SCROLL
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal')

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active')
        } else {
            reveals[i].classList.remove('active')
        }
    }
}

function ShowTopFiveFallingCryptos() {
    fetch("https://api.coincap.io/v2/assets")
        .then(result => result.json())
        .then(result => {
            let fallingCryptos = result.data.filter(crypto => {
                return crypto.changePercent24Hr < 0;
            })
            fallingCryptos.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr);

            let topFiveFallingCryptos = fallingCryptos.slice(0, 5);
            for (let i = 0; i < topFiveFallingCryptos.length; i++) {
                displayTrendingLosers.innerHTML +=
                    `
            <tr>
            <td>${i + 1}</td>
            <td>${topFiveFallingCryptos[i].name}</td>
            <td>${parseFloat(topFiveFallingCryptos[i].priceUsd).toFixed(7)}$</td>
            <td class="red-text">${Number(topFiveFallingCryptos[i].changePercent24Hr).toFixed(4)} %</td>
            </tr>
            `
            }
        });
}

function ShowTopFiveRisingCryptos() {
    fetch("https://api.coincap.io/v2/assets")
        .then(result => result.json())
        .then(result => {
            let risingCryptos = result.data.filter(crypto => {
                return crypto.changePercent24Hr > 0;
            })
            risingCryptos.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr);
            let topFiverisingCryptos = risingCryptos.slice(0, 5);
            for (let i = 0; i < topFiverisingCryptos.length; i++) {
                displayTrendingWinners.innerHTML +=
                    `
            <tr>
            <td>${i + 1}</td>
            <td>${topFiverisingCryptos[i].name}</td>
            <td>${parseFloat(topFiverisingCryptos[i].priceUsd).toFixed(7)}$</td>
            <td class="green-text">${Number(topFiverisingCryptos[i].changePercent24Hr).toFixed(4)} %</td>
            </tr>
            `
            }
        });
}

ShowTopFiveFallingCryptos()
ShowTopFiveRisingCryptos()



//LOGOUT BUTTON GETS READ AFTER THE NAV IS CREATED
let logout_btn = document.getElementById("logout_btn")

//LOGOUT BUTTON FUNCTIONALITY
if (currentUser != null) {
    logout_btn.addEventListener("click", () => {
        currentUser = null
        SaveCurrentUser(currentUser);
    })
}








