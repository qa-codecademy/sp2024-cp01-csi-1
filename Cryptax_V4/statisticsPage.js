import { LoadNavbar } from "./userDb.js";

LoadNavbar()


let cryptosToBuy = document.getElementById("cryptosToBuy")
let cryptosToSell = document.getElementById("cryptosToSell")

function ShowTopTwentyFallingCryptos() {
    fetch("https://api.coincap.io/v2/assets")
        .then(result => result.json())
        .then(result => {
            let fallingCryptos = result.data.filter(crypto => {
                return crypto.changePercent24Hr < 0;
            })
            fallingCryptos.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr);

            let topFiveFallingCryptos = fallingCryptos.slice(0, 10);
            for (let i = 0; i < topFiveFallingCryptos.length; i++) {
                cryptosToBuy.innerHTML +=
                    `
            <tr>
            <td class="borderBottomOrangeThin dataFontSize">${i + 1}</td>
            <td class="borderBottomOrangeThin dataFontSize">${topFiveFallingCryptos[i].name}</td>
            <td class="borderBottomOrangeThin dataFontSize">${parseFloat(topFiveFallingCryptos[i].priceUsd).toFixed(7)} USD</td>
            <td class="borderBottomOrangeThin dataFontSize red-text" >${Number(topFiveFallingCryptos[i].changePercent24Hr).toFixed(4)} %</td>
            <td class="borderBottomOrangeThin dataFontSize "><a href="simulator.html" class="moreDetails" href="#">More Details >>></a></td>
            </tr>
            `
            }
        });
}

function ShowTopTwentyRisingCryptos() {
    fetch("https://api.coincap.io/v2/assets")
        .then(result => result.json())
        .then(result => {
            let risingCryptos = result.data.filter(crypto => {
                return crypto.changePercent24Hr > 0;
            })
            risingCryptos.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr);
            let topFiverisingCryptos = risingCryptos.slice(0, 10);
            for (let i = 0; i < topFiverisingCryptos.length; i++) {
                cryptosToSell.innerHTML +=
            `
            <tr>
            <td class="borderBottomOrangeThin dataFontSize">${i + 1}</td>
            <td class="borderBottomOrangeThin dataFontSize">${topFiverisingCryptos[i].name}</td>
            <td class="borderBottomOrangeThin dataFontSize">${parseFloat(topFiverisingCryptos[i].priceUsd).toFixed(7)} USD</td>
            <td class="borderBottomOrangeThin dataFontSize green-text" >${Number(topFiverisingCryptos[i].changePercent24Hr).toFixed(4)} %</td>
            <td class="borderBottomOrangeThin dataFontSize "><a class="moreDetails" href="#">More Details >>></a></td>
            </tr>
            `
            }
        });
}

ShowTopTwentyFallingCryptos()
ShowTopTwentyRisingCryptos()

