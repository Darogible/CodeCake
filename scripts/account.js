/*                */
/* login to account */
/*                */
const logInEmailInput = document.getElementById("log-in-email-input");
const logInPasswordInput = document.getElementById("log-in-password-input");
const logInButton = document.getElementById("log-in-button");

function cleanOldFormLogIn() {
    logInEmailInput.value = "";
    logInPasswordInput.value = "";
}

const userData = JSON.parse(localStorage.getItem("userData"));

function controlAccount(email, password) {
    if(email === userData.email && password === userData.password) {
        return true;
    }
}

const logInError = document.querySelector(".log-in-error");

// clicking the "Log in" button
logInButton.addEventListener("click", () => {
    const email = logInEmailInput.value.trim().toLowerCase();
    const password = logInPasswordInput.value.trim();

    if(controlAccount(email, password)) {
        //console.log("Successful login to account");
        displayAccount();
        logInContainer.classList.add('visually-hidden');
    } else {
        logInError.classList.remove('visually-hidden');
        // console.log("Error! Account login failed");
    }
})

// remove the error message when the user starts to re-enter the login and password
logInEmailInput.addEventListener("input", () => {
    logInError.classList.add('visually-hidden');
})

logInPasswordInput.addEventListener("input", () => {
    logInError.classList.add('visually-hidden');
})


const newAccountContainer = document.getElementById("new-account-container");
const accountContainer = document.querySelector(".account-container");

// show account instead of login and registration buttons
function displayAccount() {
    accountContainer.classList.add('visually-hidden');

    const greeting = document.createElement('div');
    greeting.classList.add('greeting');
    newAccountContainer.appendChild(greeting);

    const greetingPhrase = document.createElement('span');
    greetingPhrase.classList.add('greetingPhrase');
    greetingPhrase.setAttribute('data-i18n', 'greeting_phrase');
    greetingPhrase.textContent = 'Hello, ';
    greeting.appendChild(greetingPhrase);

    const greetingName = document.createElement('span');
    greetingName.classList.add('greetingName');
    const nameGreeting = userData.name.split(' ')[0];
    greetingName.textContent = nameGreeting;
    greeting.appendChild(greetingName);

    const myAccountButton  = document.createElement('button');
    myAccountButton.classList.add('my-account-button');
    myAccountButton.id = "my-account-button";
    myAccountButton.setAttribute('data-i18n', 'my_account_button');
    myAccountButton.textContent = "My account";
    newAccountContainer.appendChild(myAccountButton);

    const logOutButton = document.createElement('button');
    logOutButton.classList.add('log-out-button');
    logOutButton.id = "log-out-button";
    logOutButton.setAttribute('data-i18n', 'log-out_button');
    logOutButton.textContent = "Log Out";
    logOutButton.addEventListener("click", () => {
        newAccountContainer.classList.add('visually-hidden');
        accountContainer.classList.remove('visually-hidden');
    });
    newAccountContainer.appendChild(logOutButton);

    translatePage(localStorage.getItem('lang'));
}





