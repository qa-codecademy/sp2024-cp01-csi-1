
export function NumberInStringDetector(string) {
    return /\d/.test(string)
}

export function UpperCaseDetector(string) {
    let character = '';
    let check = false;
    for (let i = 0; i <= string.length; i++) {
        character = string.charAt(i);
        if (!isNaN(character * 1)) {
        }
        else {
            if (character == character.toUpperCase()) {
                check = true;
            }
            if (character == character.toLowerCase()) {
            }
        }
    }
    return check;
}

export function NameValidation(name) {
    if(name == ""){
        console.log(`Name cannot be blank`);
        return `Cannot leave the field blank`
    }
    else if (name.length <= 2) {
        console.log(`Name cannot be shorter than 2 characters`);
        return `Name cannot be shorter than 2 characters`
    }
    else if (name.length > 25) {
        console.log(`Name cannot be longer than 20 characters `);
        return `Name cannot be longer than 20 characters `
    }
    else if (NumberInStringDetector(name) == true) {
        console.log(`Name cannot contain any numbers`);
        return `Name cannot contain any numbers`
    }
    else if (name[0] != name[0].toUpperCase()) {
        console.log(`Name must start with a capital letter`);
        return `Name must start with a capital letter`
    }
    else {
        return true
    }


}

export function UsernameValidation(username) {
    if(username == ""){
        console.log(`Cannot leave the field blank`);
        return `Cannot leave the field blank`
    }
    else if (username.length <= 5) {
        console.log(`Username cannot be shorter than 5 characters`);
        return `Username cannot be shorter than 5 characters`
    }
    else if (username.length > 20) {
        console.log(`Username cannot be longer than 20 characters `);
        return `Username cannot be longer than 20 characters `
    }
    else {
        return true
    }
}

function InternalEmailValidator(mail){
    var filter = /\S+@\S+\.\S+/;
    return filter.test(mail)
}


export function EmailValidation(mail){
    if(mail == ""){
        console.log(`Cannot leave the field blank`);
        return `Cannot leave the field blank`
    }
    else{
       if(InternalEmailValidator(mail) == false){
        console.log(`Please enter a valid mail`);
        return `Please enter a valid mail`
       }
       else{
        return true
       }
    }
}

export function PasswordValidation(pass) {
    if(pass == ""){
        console.log(`Cannot leave the field blank`);
        return `Cannot leave the field blank`
    }
    else if (pass.length <= 5) {
        console.log(`Password cannot be shorter than 5 characters`);
        return `Password cannot be shorter than 5 characters`
    }
    else if (pass.length > 20) {
        console.log(`Password cannot be longer than 20 characters `);
        return `Password cannot be longer than 20 characters `
    }
    else if (NumberInStringDetector(pass) == false) {
        console.log(`Password must contain a number`);
        return `Password must contain a number`
    }
    else if (UpperCaseDetector(pass) == false){
        console.log(`Password must contain at least one capital letter`);
        return `Password must contain at least one capital letter`
    }
    else {
        return true
    }
}