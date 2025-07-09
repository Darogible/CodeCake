function cleanOldFormSignUp() {
// Clear all fields
    nameAndSurnameInput.value = '';
    signUpEmailInput.value = '';
    signUpPasswordInput.value = '';
    signUpRepeatPasswordInput.value = '';
    telephoneNumberInput.value = '';

    controlName.classList.add('visually-hidden');
    controlName.textContent = '';

    controlEmail.classList.add('visually-hidden');
    controlEmail.textContent = '';

    strengthPassword.classList.add('visually-hidden');
    strengthPassword.textContent = '';

    repeatPassword.classList.add('visually-hidden');
    repeatPassword.textContent = '';

    controlTelephoneNumber.classList.add('visually-hidden');
    controlTelephoneNumber.textContent = '';

    signUpError.classList.add('visually-hidden');

    // Reset password strength flag
    isPasswordStrongEnough = false;
}



// check username
const nameAndSurnameInput = document.getElementById("name-and-surname-input");
const controlName = document.getElementById("control-name");

function validateNameAndSurname () {
    const value = nameAndSurnameInput.value.trim(); // trim() will remove extra spaces
    if(/^[A-Za-zÀ-žА-Яа-яЁё]+([ -][A-Za-zÀ-žА-Яа-яЁё]+)+$/.test(value)) {
        return true;
    }
}

// remove the invalid name announcement if the user starts entering a new one
nameAndSurnameInput.addEventListener("input", () => {
    controlName.classList.add('visually-hidden');
    signUpError.classList.add('visually-hidden');
})


// checking user's email
const signUpEmailInput = document.getElementById("sign-up-email-input");
const controlEmail = document.getElementById("control-email");

function validateEmailSignUp() {
    const value = signUpEmailInput.value.trim();
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return true;
    }
}

// remove the announcement about incorrect mail if the user starts entering a new one
signUpEmailInput.addEventListener("input", () => {
    controlEmail.classList.add('visually-hidden');
    signUpError.classList.add('visually-hidden');
})


// checking the user's phone number
const telephoneNumberInput = document.getElementById("telephone-number-input");
const controlTelephoneNumber = document.getElementById("control-telephone-number");

function validateTelephoneNumber() {
    const value = telephoneNumberInput.value.trim();
    // check for international number
    if(/^\+\d{6,15}$/.test(value.replace(/[\s\-()]/g, '')) || value === '') {
        return true;
    }
}

// checking the user's password for strength
const signUpPasswordInput = document.getElementById("sign-up-password-input");
const strengthPassword = document.getElementById('strength-password');
let isPasswordStrongEnough = false;

function controlStrengthPassword (password) {
    let strength = 0;
    if(/[A-B]/.test(password)) {
        strength++;
    }
    if(/[0-9]/.test(password)) {
        strength++;
    }
    if(/[^A-Za-z0-9]/.test(password)){
        strength++;
    }


    if (password.length === 0) {
        strengthPassword.textContent = "";
        strengthPassword.setAttribute("data-i18n", "strength_nothing");
    } else if (strength > 2 && password.length > 7) {
        strengthPassword.setAttribute("data-i18n", "strength_strong");
        strengthPassword.textContent = "Strong";
        isPasswordStrongEnough = true;
        successStyles(strengthPassword);
    } else if (strength > 1 && password.length > 7) {
        strengthPassword.setAttribute("data-i18n", "strength_medium");
        strengthPassword.textContent = "Medium";
        isPasswordStrongEnough = true;
        strengthPassword.style.backgroundColor = '#fcf8e3';
        strengthPassword.style.color = '#8a6d3b';
    } else if (strength <= 1) {
        strengthPassword.setAttribute("data-i18n", "strength_weak");
        strengthPassword.textContent = "Weak";
        addErrorStyles(strengthPassword);
    }

    translatePage(localStorage.getItem('lang'));
    strengthPassword.classList.remove('visually-hidden');
}

// the user enters the password himself
signUpPasswordInput.addEventListener('input', () => {
    const password = signUpPasswordInput.value;
    controlStrengthPassword(password);
})

// user pasted password from clipboard
signUpPasswordInput.addEventListener('paste', () => {
    setTimeout(() => {
        controlStrengthPassword(signUpPasswordInput.value);
    }, 10);
})


// check for repeated password entry
const signUpRepeatPasswordInput = document.getElementById("sign-up-repeat-password-input");
const repeatPassword = document.getElementById('repeat-password');

signUpRepeatPasswordInput.addEventListener('input', () => {
    if(controlRepeatPassword()) {
        repeatPassword.setAttribute("data-i18n", "passwords_match");
        repeatPassword.textContent = "Passwords match";
        successStyles(repeatPassword);
    } else {
        repeatPassword.setAttribute("data-i18n", "passwords_do_not_match");
        repeatPassword.textContent = "Passwords do not match";
        addErrorStyles((repeatPassword))
    }

    translatePage(localStorage.getItem('lang'));
    repeatPassword.classList.remove('visually-hidden');
})

function controlRepeatPassword() {
    if(signUpPasswordInput.value === signUpRepeatPasswordInput.value && signUpPasswordInput.value !== '') {
        return true;
    }
}


// check data before sending, call all functions
const signUpButton = document.getElementById("sign-up-button");
const signUpError = document.querySelector(".sign-up-error");


signUpButton.addEventListener("click", () => {
    if(validateNameAndSurname() && validateEmailSignUp() && validateTelephoneNumber() && controlRepeatPassword()
        && isPasswordStrongEnough) {
        createAccount();
        controlName.classList.add('visually-hidden');
        // console.log("Account created successfully");
    } else {
        // console.log("Error! Account not created");
        signUpError.classList.remove('visually-hidden');
        if(signUpPasswordInput.value === '') {
            strengthPassword.classList.remove('visually-hidden');
            strengthPassword.setAttribute("data-i18n", "strength_error");
            strengthPassword.textContent = "Please create a password";
            addErrorStyles(strengthPassword);
        }
    }

    if (!validateNameAndSurname()) {
        controlName.classList.remove('visually-hidden');
        controlName.textContent = "Please enter a valid name";
        controlName.setAttribute("data-i18n", "valid_name");
        addErrorStyles(controlName);
    }

    if (!validateEmailSignUp()) {
        controlEmail.classList.remove('visually-hidden');
        controlEmail.textContent = "Please enter a valid email";
        controlEmail.setAttribute("data-i18n", "valid_email");
        addErrorStyles(controlEmail);
    }

    if (!validateTelephoneNumber()) {
        controlTelephoneNumber.classList.remove('visually-hidden');
        controlTelephoneNumber.textContent = "Telephone number is not valid";
        controlTelephoneNumber.setAttribute("data-i18n", "valid_telephone");
        addErrorStyles(controlTelephoneNumber);
    }

    translatePage(localStorage.getItem('lang'));
})


function addErrorStyles(item) {
    item.style.backgroundColor = '#f2dede';
    item.style.color = '#a94442';
}

function successStyles(item) {
    item.style.backgroundColor = '#dff0d8';
    item.style.color = '#3c763d';
}



function createAccount() {
    const name = nameAndSurnameInput.value;
    const email = signUpEmailInput.value.toLowerCase();
    const password = signUpRepeatPasswordInput.value;
    const telephoneNumber = telephoneNumberInput.value;

    const UserData = {
        name: name,
        email: email,
        password: password,
        telephoneNumber: telephoneNumber,
    }

    localStorage.setItem("userData", JSON.stringify(UserData));
    successCreateAccount();
    cleanOldFormSignUp();
}

function successCreateAccount() {
    signUpContainer.classList.add("visually-hidden");

// Create a popup window in the center
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");
    alertBox.setAttribute("data-i18n", "alertErrorBox");
    alertBox.textContent = "🟢 Registration successful! 🟢 ";

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 1000);
}