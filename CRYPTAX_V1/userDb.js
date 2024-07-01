// USER DB CODE SO IT LOADS INSTANTLY ON STARTUP
export class User {
    constructor(id, firstName, lastName, username, password, email, moneyWallet, coinWallet) {
        this.id = id,
            this.firstName = firstName,
            this.lastName = lastName,
            this.fullName = `${this.firstName} ${this.lastName}`
        this.username = username,
            this.password = password,
            this.email = email,
            this.moneyWallet = moneyWallet,
            this.coinWallet = coinWallet
    }
}

export let userDB =
    [
        new User(1, "Test", "Testerson", "Test123", "test", "test@gmail.com", 500000, { 'BTC': { "Ammount": 3, "Bought for": 192438.27 }, 'ETH': { "Ammount": 12.56, "Bought for": 12412451324 }, "TRX": { "Ammount": 6, "Bought for": 12 } }),
        new User(2, "Ryan", "Gosling", "Stuntman123", "Password5%", "test2@gmail.com", 10000, { 'ETH': { "Ammount": 5, "Bought for": 9877766 }, "TRX": { "Ammount": 1, "Bought for": 238746 } }),
        new User(3, "Bob", "Bobski", "Bobinator", "Test123", "test3@gmail.com", 1500000, { "TRX": { "Ammount": 2, "Bought for": 129834 } })
    ]

export function SaveDb() {
    let userDBserialized = JSON.stringify(userDB)
    localStorage.setItem("userDB", userDBserialized)
    console.log("Database is saved");
}

export function LoadDB() {
    let userDBdeserialized = JSON.parse(localStorage.getItem("userDB"))
    userDB = userDBdeserialized;
    console.log("Database is loaded");
}

if(localStorage.getItem("userDB") != null){
    LoadDB();
}



//CURRENT USER CODE 

// let currentUser = null;

export function SaveCurrentUser(user) {
    let currentUserSerialized = JSON.stringify(user)
    localStorage.setItem("currentUser", currentUserSerialized)
    console.log("Current user is saved");
    console.log(localStorage.getItem("currentUser"));
}

export function LoadCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    return currentUser
}