const toggleTheme = document.getElementById("toggle-theme");
const darkStyle = document.getElementById('dark-style');
const savedTheme = localStorage.getItem('theme');
const logoImg = document.querySelector('.header-logo img');


if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
    translatePage('en');
}

/*
localStorage.setItem('theme', 'light');
*/

if (savedTheme === 'dark') {
    darkStyle.disabled = false;
    if(toggleTheme) {
        toggleTheme.checked = true; // to enable toggleTheme in dark theme
    }
    logoImg.src = './assets/codeCake3.png';
}

/* theme switcher */
if(toggleTheme) {
    toggleTheme.addEventListener("click", () => {
        const isDarkTheme = !darkStyle.disabled;

        if(isDarkTheme) {
            darkStyle.disabled = true;
            localStorage.setItem('theme', 'light');
            logoImg.src = './assets/codeCake2.png';
        } else {
            darkStyle.disabled = false;
            localStorage.setItem('theme', 'dark');
            logoImg.src = './assets/codeCake3.png';
        }
    })
}



const burgerButton = document.getElementById("burger-button");
const navBar = document.getElementById("nav-bar");

console.log("Current window width:", window.innerWidth);

// initially hidden on mobile devices
if (navBar && window.innerWidth <= 500) {
    navBar.classList.add('visually-hidden');
}



if (burgerButton) {
    burgerButton.addEventListener("click", () => {
        navBar.classList.toggle('visually-hidden');

        // change the icon on the button
        if (burgerButton.textContent === '☰') {
            burgerButton.textContent = '✖';
            if(!(cartDisplay.classList.contains('visually-hidden'))) {
                closeCart();
            }
        } else {
            burgerButton.textContent = '☰';
        }
    })
}

function closeMobileMenu() {
    navBar.classList.toggle('visually-hidden');
    burgerButton.textContent = '☰';
}


const backToTopButton = document.getElementById("back-to-top");

if(backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {  // show only when scrolling down
            backToTopButton.classList.remove('visually-hidden');
        } else {
            backToTopButton.classList.add('visually-hidden');
        }

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    })
}


//
/* logic for opening and closing the basket */
//
const headerCart = document.getElementById("header-cart");
const cartDisplay = document.getElementById("cart-display-container");
const header = document.querySelector('header');

if(headerCart && cartDisplay) {
    headerCart.addEventListener('click', (event) => {
        event.stopPropagation(); // stopPropagation stops moving up the DOM tree

        if (cartDisplay.classList.contains('visually-hidden')) {
            cartDisplay.classList.remove('visually-hidden');
            header.classList.add('no-shadow');

            if (burgerButton.textContent === '✖') {
                closeMobileMenu();
            }
        } else {
            closeCart();
        }
    });
}


function closeCart() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
        cartDisplay.classList.add('visually-hidden');
        header.classList.remove('no-shadow');
    }
}


// if click outside the cart, the cart will close
if(cartDisplay) {
    document.addEventListener('click', (event) => {
        const isClickInsideCart = cartDisplay.contains(event.target);

        if(!cartDisplay.classList.contains('visually-hidden') && !isClickInsideCart) {
            closeCart();
        }
    });
}


// if click inside the cart, the cart will not close
if(cartDisplay) {
    cartDisplay.addEventListener('click', (event) => {
        event.stopPropagation(); //
    });
}



//
/* log in and sign up */
//

// opening login to account
const logInContainer = document.getElementById("log-in-container");
const accountButton = document.getElementById("account-button");

if(accountButton) {
    accountButton.addEventListener("click", () => {
        logInContainer.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');
        closeMobileMenu();
        cleanOldFormLogIn();
        logInError.classList.add('visually-hidden');
    })
}

// opening registration account
const signUpContainer = document.getElementById("sign-up-container");
const newAccountButton = document.getElementById("new-account-button");

if(newAccountButton) {
    newAccountButton.addEventListener("click", () => {
        signUpContainer.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');
        closeMobileMenu();
    })
}

// universal closing of modal windows
const closeForms = document.querySelectorAll(".close-form");

closeForms.forEach(button => {
    button.addEventListener("click", () => {
        logInContainer.classList.add('visually-hidden');
        signUpContainer.classList.add('visually-hidden');
        document.body.classList.remove('no-scroll');
    });
});


// registration instead of logging into an account
const signUpButtonLoginForm = document.getElementById("sign_up_button_login_form");

if(signUpButtonLoginForm) {
    signUpButtonLoginForm.addEventListener("click",() => {
        logInContainer.classList.add('visually-hidden');
        signUpContainer.classList.remove('visually-hidden');
    });
}


// open the registration form if the user clicked "Sign up" while viewing his order
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("openSignUp") === "true") {
        const signUpContainer = document.getElementById("sign-up-container");
        if (signUpContainer) {
            signUpContainer.classList.remove("visually-hidden");
        }
        sessionStorage.removeItem("openSignUp");
    }
});


// full reset local storage for testing from scratch
const resetButton = document.getElementById("reset-button");
const confirmResetButton = document.getElementById("confirm-reset-button");
const cancelResetButton = document.getElementById("cancel-reset-button");

if(resetButton) {
    resetButton.addEventListener("click", () => {
        const resetConfirmation = document.querySelector(".reset-confirmation");
        resetConfirmation.classList.remove('visually-hidden');
        navBar.classList.toggle('visually-hidden');
        burgerButton.textContent = '☰';

        confirmResetButton.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
            resetConfirmation.classList.add('visually-hidden');
        });

        cancelResetButton.addEventListener("click", () => {
            resetConfirmation.classList.add('visually-hidden');
        })
    })
}


// buttons to make password visible
document.querySelectorAll('.password-visually-hidden').forEach(button => {
    button.addEventListener('click', () => {
        // Find the input field located before the button
        const input = button.parentElement.querySelector('input');
        if (!input) return;

        // Switch the input type
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        // Find the available image
        const icon = button.querySelector('img');
        if (icon) {
            icon.src = isPassword ? './assets/eyePasswordClose.svg' : './assets/eyePassword.svg';
        }
    });
});

let cakeCard = document.querySelectorAll('.cake-card');

// opening by the "more details" button and transferring data about the cake there
document.addEventListener('click', function(event) {
    if(event.target.classList.contains('more-details')) {
        const button = event.target;
        const id = button.dataset.id;
        const name = button.dataset.name;
        let filling = button.dataset.filling;
        switch (userLang) {
            case 'ru':
                if (filling === 'chocolate') filling = 'Шоколадная';
                else if (filling === 'caramel') filling = 'Карамельная';
                else if (filling === 'fruity') filling = 'Фруктовая';
                break;

            case 'cz':
                if (filling === 'chocolate') filling = 'Čokoládová';
                else if (filling === 'caramel') filling = 'Karamelová';
                else if (filling === 'fruity') filling = 'Ovocná';
                break;

            default: // 'en' or fallback
                if (filling === 'chocolate') filling = 'Chocolate';
                else if (filling === 'caramel') filling = 'Caramel';
                else if (filling === 'fruity') filling = 'Fruity';
        }
        const price = button.dataset.price;
        const weight = button.dataset.weight;
        const description = button.dataset.description;
        const features = button.dataset.features;

        const currentCake = {
            id: id,
            name: name,
            filling: filling,
            price: price,
            weight: weight,
            description: description,
            features: features,
        }

        sessionStorage.setItem('currentCake', JSON.stringify(currentCake));
        window.location.href = 'product.html';
    }
})


