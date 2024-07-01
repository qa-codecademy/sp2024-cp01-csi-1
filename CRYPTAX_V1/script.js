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

// MAKING THE LOGIN FORM A POPUP

// document.querySelector("#show-login").addEventListener('click', () => {
//     document.querySelector(".popupLogin").classList.add("active");
// });

// document.querySelector(".popupLogin .closeButton").addEventListener('click', () => {
//     document.querySelector("popupLogin").classList.remove("active")
// })







