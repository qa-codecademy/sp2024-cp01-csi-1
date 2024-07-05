import { SaveCurrentUser, LoadCurrentUser, userDB, LoadDB} from "./userDb.js";

//LOGIN VARIABLES
let emailInputLogin = document.getElementById("emailInputLogin")
let passwordInputLogin = document.getElementById("passwordInputLogin")
let errorMessageDisplay = document.getElementById("errorMessageDisplayLogin")

//LOGIN BUTTON 
let loginButton = document.getElementById("loginButton")

LoadDB();

loginButton.addEventListener('click', () => {
    let currentUser = null;
    for (var user of userDB) {
        if ((user.email == emailInputLogin.value) && (user.password == passwordInputLogin.value)) {
            SaveCurrentUser(user)
            currentUser = LoadCurrentUser()
            console.log(LoadCurrentUser());
            break
        }
    }
    if (currentUser == null) {
        errorMessageDisplay.innerHTML = `<p style="color: red;">Unsuccessful login, please try again</p>`
        console.log(`Unsuccessful login, please try again.`);
    }
    else {
        errorMessageDisplay.innerHTML = `<p style="color: green;">User ${currentUser.username} has successfully logged in</p>`
        console.log(`User ${currentUser.username} has successfully logged in`);
    }

})