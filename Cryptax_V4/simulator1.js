import { LoadCurrentUser, LoadNavbar } from "./userDb.js";

const cryptoTable = document.getElementById('cryptoTable');
let isBuyingCrypto = true;
let isSellingCrypto = false;
let buyOrSellCryptoHeader = document.getElementById('buyOrSellCryptoHeader');
let buyOrSellCryptoBtn = document.getElementById('buyOrSellCryptoBtn');
let spendCurrencyDiv = document.querySelector('.cash-currency');
let receivedCurrencyDiv = document.querySelector('.coinSelect-sign');
let cryptoBalanceModalButton = document.getElementById('cryptoBalance');
let cryptoBalanceModal = document.getElementById('cryptoModal');
let cryptoAccountBalanceInDollars = document.getElementById('cryptoAccountCash').value;
let accountCash = document.getElementById('accountCash');
let boughtCryptos = [];
let cryptoValueInDollarsSum = 0;
// localStorage.clear();

let currentUser = LoadCurrentUser()
LoadNavbar()


function saveDataToLocalStorage() {
    localStorage.setItem('boughtCryptos', JSON.stringify(boughtCryptos));

    localStorage.setItem('accountBalance', document.getElementById('accountCash').value);

    localStorage.setItem('cryptoBalanceInDollars', document.getElementById('cryptoAccountCash').value);

}


function loadDataFromLocalStorage() {
    let storedBoughtCryptos = localStorage.getItem('boughtCryptos');
    if (storedBoughtCryptos) {
        try {
            boughtCryptos = JSON.parse(storedBoughtCryptos);
        } catch (error) {
            console.error('Error parsing boughtCryptos:', error);
            boughtCryptos = [];
        }
    } else {
        boughtCryptos = [];
    }

    let storedAccountBalance = localStorage.getItem('accountBalance');
    if (storedAccountBalance) {
        document.getElementById('accountCash').value = storedAccountBalance;
    }

    let storedCryptoBalanceInDollars = localStorage.getItem('cryptoBalanceInDollars');
    if (storedCryptoBalanceInDollars) {
        document.getElementById('cryptoAccountCash').value = storedCryptoBalanceInDollars;
    }
}



function setCashToTheAccount() {
    while (true) {
        let cash = parseFloat(prompt("Please enter your wanted amount of cash!"));
        if (cash === 0 || isNaN(cash) || cash < 0) {
            alert("Please enter valid amount of cash!");
            continue;
        }
        document.getElementById('accountCash').value = cash;
        break;
    }
} // OPTIONAL


function CalculateCryptoValueInDollars() {
    let totalValueInDollars = 0;

    for (let i = 0; i < boughtCryptos.length; i++) {
        let crypto = boughtCryptos[i];
        let cryptoSymbol = crypto.symbol;
        let cryptoAmount = crypto.amount;
        let cryptoValue = crypto.value;


        let cryptoValueInDollars = cryptoAmount * cryptoValue;
        console.log("Crypto Symbol:", cryptoSymbol);
        console.log("Crypto amount:", cryptoAmount);
        console.log("Crypto value in dollars:", cryptoValueInDollars);
        console.log("=================");

        totalValueInDollars += cryptoValueInDollars; // Multiply amount with its value
    }

    return totalValueInDollars;
}




function getCryptoValue(symbol) {
    let selectElement = document.querySelector('.crypto-select');
    let selectedIndex = selectElement.selectedIndex;

    if (!selectElement) {
        console.error("Crypto select element not found.");
        return 0;
    }

    let option = selectElement.options[selectedIndex];
    if (!option) {
        console.error(`Option for symbol ${symbol} not found in select element.`);
        return 0;
    }

    let priceUsd = parseFloat(option.value);
    console.log("Option value:", priceUsd);

    return priceUsd;
}

async function getData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log("Error", error.message);
    }
}

async function fetchData(url) {
    try {
        return await getData(url);
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
}

async function HandleCryptoStats() {
    let cryptos = [];
    if (boughtCryptos.length > 0) {
        cryptos = boughtCryptos.filter(crypto => crypto.changePercent24Hr);

    }

    return cryptos;
}



async function ShowCryptoStats() {
    try {
        let walletCryptos = await HandleCryptoStats();


        let cryptosDiv = document.getElementById('topFive');
        cryptosDiv.innerHTML = '';

        if (walletCryptos.length === 0) {
            cryptosDiv.innerHTML =
                `<img src="assets/images/emptyWallet.jpg" alt="Empty wallet image" class="w-100 h-100"/>`;
        } else {
            cryptosDiv.innerHTML += '<h4 class="text-centered crypto-header">Crypto Wallet Stats</h4>';
            walletCryptos.forEach((element, index) => {
                cryptosDiv.innerHTML += `
                    <div class="row margin-zero">
                        <div class="col-1 crypto-item">${index + 1}.</div>
                        <div class="col-2 crypto-item">${element.symbol}</div>
                        <div class="col-3 crypto-item ${element.changePercent24Hr > 0 ? 'crypto-positiveChange' : 'crypto-negativeChange'}">${Number(element.changePercent24Hr).toFixed(4)} %</div>

                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error in ShowCryptoStats:", error);
    }
}


async function FillCoinSelectMenu(coinDiv) {
    let cryptosData = await fetchData('https://api.coincap.io/v2/assets');
    if (cryptosData.data) {
        let topTwentyCryptos = cryptosData.data.filter(crypto => {
            return crypto.rank <= 20;
        })
        let coinSelectDiv = document.querySelector(`.${coinDiv}`);
        coinSelectDiv.innerHTML = '';
        let selectElement = document.createElement('select');
        selectElement.classList.add('crypto-select')
        topTwentyCryptos.forEach((option, index) => {
            const cryptoOption = document.createElement('option');
            cryptoOption.text = `${option.symbol}`;
            cryptoOption.changePercent24Hr = `${option.changePercent24Hr}` // NEW!!!
            cryptoOption.value = `${option.priceUsd}`;
            let baseClass = 'crypto-currency';
            let symbolClass = `crypto-${option.symbol}`;
            let amountClass = 'crypto-amount';
            cryptoOption.className = `${baseClass} ${symbolClass} ${amountClass}`;
            selectElement.appendChild(cryptoOption)
        });
        coinSelectDiv.appendChild(selectElement);
    }
}

async function FillSelectMenuWithCurrency(currencyDiv) {
    let currencySelectDiv = document.querySelector(`.${currencyDiv}`);
    currencySelectDiv.innerHTML = '';
    let selectElement = document.createElement('select');
    const currencyOption = document.createElement('option');
    currencyOption.text = `$`;
    currencyOption.value = 1;
    currencyOption.className = 'currency';
    selectElement.appendChild(currencyOption)

    currencySelectDiv.appendChild(selectElement);
}

function BuyCrypto() {

    let spentAmountValue = parseFloat(document.getElementById('spentAmount').value);
    let accountCashValue = parseFloat(document.getElementById('accountCash').value);
    let selectElement = document.querySelector('.crypto-select');
    console.log(selectElement);
    let chosenCryptoValue = parseFloat(selectElement.options[selectElement.selectedIndex].value);
    let chosenCryptoSymbol = selectElement.options[selectElement.selectedIndex].text;
    let chosenCryptoChange = selectElement.options[selectElement.selectedIndex].changePercent24Hr; // NEW!!
    let receivedAmountOfCoins = parseFloat(spentAmountValue / chosenCryptoValue);
    let receivedAmountOfCoinsInputValue = document.getElementById('receivedAmount').value;




    if (isNaN(spentAmountValue) || spentAmountValue < 0 || spentAmountValue == 0) {
        console.error("Please enter valid amount!");
        document.getElementById('receivedAmount').value = 0;
        return;
    }


    if (spentAmountValue > accountCashValue) {
        console.error("You have insufficient funds!");
        return;

    }
    if (accountCashValue == 0 || spentAmountValue == 0) {
        buyOrSellCryptoBtn.disabled = true;
    }

    receivedAmountOfCoinsInputValue = receivedAmountOfCoins;
    console.log("receivedAmountOfCoinsInputValue", receivedAmountOfCoinsInputValue);
    accountCashValue -= spentAmountValue;
    document.getElementById('accountCash').value = accountCashValue.toFixed(6);
    document.getElementById('receivedAmount').value = receivedAmountOfCoinsInputValue.toFixed(6);
    document.getElementById('accountCash').value = accountCashValue.toFixed(2);

    UpdateBoughtCryptos(chosenCryptoSymbol, receivedAmountOfCoins, chosenCryptoValue, chosenCryptoChange);
    AddBoughtCryptoInWallet();
    document.getElementById('cryptoAccountCash').value = CalculateCryptoValueInDollars();

}


function UpdateBoughtCryptos(symbol, amount, value, changePercent24Hr) {
    let existingCryptoIndex = boughtCryptos.findIndex(crypto => crypto.symbol === symbol);

    if (existingCryptoIndex !== -1) {
        boughtCryptos[existingCryptoIndex].amount += amount;
        boughtCryptos[existingCryptoIndex].value = value;
        boughtCryptos[existingCryptoIndex].changePercent24Hr = changePercent24Hr;
    } else {
        boughtCryptos.push({ symbol: symbol, amount: amount, value: value, changePercent24Hr: changePercent24Hr });
    }
}



function AddBoughtCryptoInWallet() {
    let modalMainContent = document.getElementById("userCryptoBalance");


    modalMainContent.innerHTML = '';


    for (let i = 0; i < boughtCryptos.length; i++) {
        let crypto = boughtCryptos[i];


        let newRow = document.createElement('div');
        newRow.classList.add('row', `crypto-${crypto.symbol}`);
        newRow.innerHTML = `
            <div class="col-md-12"><span class="crypto-amount">${crypto.amount}</span> ${crypto.symbol}</div>
        `;
        modalMainContent.appendChild(newRow);
    }
}



function SellCrypto() {
    let selectElement = document.querySelector('.crypto-select');
    let chosenCryptoValue = parseFloat(selectElement.options[selectElement.selectedIndex].value);
    let chosenCryptoSymbol = selectElement.options[selectElement.selectedIndex].text;
    let spentAmountValue = document.getElementById('spentAmount').value;
    let index = boughtCryptos.findIndex(crypto => crypto.symbol == chosenCryptoSymbol);
    if (index === -1) {
        console.error(`Cryptocurrency with symbol ${chosenCryptoSymbol} not found in boughtCryptos.`);
        return;
    }

    if (spentAmountValue <= 0 || spentAmountValue > boughtCryptos[index].amount) {
        console.error(`Invalid amount ${spentAmountValue} to sell for ${chosenCryptoSymbol}.`);
        return;
    }

    boughtCryptos[index].amount -= spentAmountValue;


    if (boughtCryptos[index].amount === 0) {
        boughtCryptos.splice(index, 1);
        RemoveCryptoFromDOM(chosenCryptoSymbol);
    } else {
        UpdateCryptoAmountInDOM(chosenCryptoSymbol, boughtCryptos[index].amount);
    }

    let accountCashElement = document.getElementById("accountCash");

    let currentBalance = parseFloat(accountCashElement.value);

    let cryptoValueInDollars = spentAmountValue * chosenCryptoValue;
    document.getElementById('receivedAmount').value = cryptoValueInDollars


    document.getElementById('cryptoAccountCash').value = CalculateCryptoValueInDollars(chosenCryptoValue).toFixed(5);
    currentBalance += cryptoValueInDollars;
    document.getElementById("accountCash").value = currentBalance;

}

function UpdateCryptoAmountInDOM(symbol, newAmount) {
    let modalMainContent = document.getElementById("userCryptoBalance");
    let existingCryptoElement = modalMainContent.querySelector(`.crypto-${symbol}`);

    if (existingCryptoElement) {
        let amountElement = existingCryptoElement.querySelector('.crypto-amount');
        amountElement.textContent = newAmount.toFixed(4);
    } else {
        console.error(`Element with symbol ${symbol} not found in DOM.`);
    }
}

function RemoveCryptoFromDOM(symbol) {
    let modalMainContent = document.getElementById("userCryptoBalance");
    let cryptoElement = modalMainContent.querySelector(`.crypto-${symbol}`);

    if (cryptoElement) {
        cryptoElement.remove();
    } else {
        console.error(`Element with symbol ${symbol} not found in DOM.`);
    }
}



window.addEventListener("load", async () => {
    // setCashToTheAccount();
    loadDataFromLocalStorage();
    AddBoughtCryptoInWallet();
    ShowCryptoStats();
    await FillCoinSelectMenu('coinSelect-sign');
    await FillSelectMenuWithCurrency('cash-currency');

});


let buyBtn = document.getElementById('buyBtn');
buyBtn.addEventListener('click', async () => {
    try {
        await FillCoinSelectMenu('coinSelect-sign');
        await FillSelectMenuWithCurrency('cash-currency');

        buyOrSellCryptoHeader.innerHTML = "Buy Crypto";
        buyOrSellCryptoBtn.innerHTML = "Buy";
        isBuyingCrypto = true;
        isSellingCrypto = false;

    } catch (error) {
        console.error('Error filling menus:', error);
    }
});

let sellBtn = document.getElementById('sellBtn');
sellBtn.addEventListener('click', async () => {
    await FillCoinSelectMenu('cash-currency');
    await FillSelectMenuWithCurrency('coinSelect-sign');
    buyOrSellCryptoHeader.innerHTML = "Sell Crypto";
    buyOrSellCryptoBtn.innerHTML = "Sell";
    isBuyingCrypto = false;
    isSellingCrypto = true;

});

buyOrSellCryptoBtn.addEventListener('click', async () => {
    if (isBuyingCrypto) {
        BuyCrypto();
        await ShowCryptoStats();
        saveDataToLocalStorage();

    }
    else if (isSellingCrypto) {
        SellCrypto();
        ShowCryptoStats();
        saveDataToLocalStorage();

    }
});



cryptoBalanceModal.addEventListener('shown.bs.modal', () => {
    cryptoBalanceModalButton.focus()
})


