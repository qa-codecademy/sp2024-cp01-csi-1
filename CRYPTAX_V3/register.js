//IMPORTED FUNCTIONS FROM VALIDATIONS
import { NameValidation, UsernameValidation, PasswordValidation, EmailValidation } from "./validations.js"
import { userDB, SaveDb, User} from "./userDb.js";

//REGISTER SECTION DOM (INPUTS)
let firstNameInput = document.getElementById("firstName")
let lastNameInput = document.getElementById("lastName")
let usernameInputRegister = document.getElementById("usernameInputRegister")
let passwordInputRegister = document.getElementById("passwordInputRegister")
let emailInput = document.getElementById("emailInput")


//ERROR MESSAGES 
let ErrorMessageFirstName = document.getElementById("errorMessageFirstName")
let ErrorMessageLastName = document.getElementById("errorMessageLastName")
let ErrorMessageEmail = document.getElementById("errorMessageEmail")
let ErrorMessageUsername = document.getElementById("errorMessageUsername")
let ErrorMessagePassword = document.getElementById("errorMessagePassword")

//BUTTONS
let registerButton = document.getElementById("registerButton")



//REGISTER
registerButton.addEventListener("click", () => {
    let firstName = NameValidation(firstNameInput.value)
    let lastName = NameValidation(lastNameInput.value)
    let username = UsernameValidation(usernameInputRegister.value)
    let email = EmailValidation(emailInput.value)
    // TUKA TREBA DA STAVAM ZA MEJL NEKOJA VALIDACIJA
    let password = PasswordValidation(passwordInputRegister.value)
    let arrayOfProperties = { firstName, lastName, username, email, password }
    if ((firstName == true) && (lastName == true) && (username == true) && (password == true) && (email == true)) {
        let newUser = new User(userDB.length + 1, firstNameInput.value, lastNameInput.value, usernameInputRegister.value, passwordInputRegister.value, emailInput.value, 0, {})

        //CHECK (not my best work ngl i was in a rush)
        let check = userDB.find(user => user.email == newUser.email)
        if (check != undefined) {
            ErrorMessagePassword.innerHTML = `<p style="color: red;">User with that email already exists</p>`;
        }
        if (check == undefined) {
            check = userDB.find(user => user.username == newUser.username)
            if (check != undefined) {
                ErrorMessagePassword.innerHTML = `<p style="color: red;">User with that username already exists</p>`;
            }
        }
        if (check == undefined) {
            userDB.push(newUser)
            console.log("New user successfully created");
            ErrorMessagePassword.innerHTML = `<p style="color: green;">User ${newUser.username} has successfully been registered</p>`
            SaveDb()
        }
    }
    else {

        ErrorMessageFirstName.innerHTML = ``
        ErrorMessageFirstName.innerHTML = firstName == true ? "" : `<p style="color: red;">${firstName}</p>`

        ErrorMessageLastName.innerHTML = ``
        ErrorMessageLastName.innerHTML = lastName == true ? "" : `<p style="color: red;">${lastName}</p>`

        ErrorMessageUsername.innerHTML = ``
        ErrorMessageUsername.innerHTML = username == true ? "" : `<p style="color: red;">${username}</p>`

        ErrorMessageEmail.innerHTML = ``
        ErrorMessageEmail.innerHTML = email == true ? "" : `<p style="color: red;">${email}</p>`

        ErrorMessagePassword.innerHTML = ``
        ErrorMessagePassword.innerHTML = password == true ? "" : `<p style="color: red;">${password}</p>`
        //OVA MOZE BOLJE DA BIDE
    }
})
