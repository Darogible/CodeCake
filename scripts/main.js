const toggleTheme = document.getElementById("toggle-theme");
const darkStyle = document.getElementById('dark-style');
const savedTheme = localStorage.getItem('theme');
const logoImg = document.querySelector('.header-logo img');


if (savedTheme === 'dark') {
    darkStyle.disabled = false;
    toggleTheme.checked = true; // to enable toggleTheme in dark theme
    logoImg.src = './assets/codeCake3.png';
}

/* theme switcher */
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



const burgerButton = document.getElementById("burger-button");
const navBar = document.getElementById("nav-bar");

console.log("Current window width:", window.innerWidth);

// initially hidden on mobile devices
if (navBar && window.innerWidth <= 400) {
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


//
/* logic for opening and closing the basket */
//
const headerCart = document.getElementById("header-cart");
const cartDisplay = document.getElementById("cart-display-container");
const header = document.querySelector('header');

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


function closeCart() {
    cartDisplay.classList.add('visually-hidden');
    header.classList.remove('no-shadow');
}

// if click outside the cart, the cart will close
document.addEventListener('click', (event) => {
    const isClickInsideCart = cartDisplay.contains(event.target);

    if(!cartDisplay.classList.contains('visually-hidden') && !isClickInsideCart) {
        closeCart();
    }
})

// if click inside the cart, the cart will not close
cartDisplay.addEventListener('click', (event) => {
    event.stopPropagation(); //
});



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

signUpButtonLoginForm.addEventListener("click",() => {
    logInContainer.classList.add('visually-hidden');
    signUpContainer.classList.remove('visually-hidden');
})