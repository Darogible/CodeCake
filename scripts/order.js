import { renderCart } from './cart.js';
import { addErrorStyles } from './register.js';
import { validateNameAndSurname } from './register.js';
import { validateEmailSignUp } from './register.js';
import { validateTelephoneNumber } from './register.js';


// variables necessary for correct operation of imported functions
const nameAndSurnameInput = document.getElementById("name-and-surname-input");
const controlName = document.getElementById("control-name");
const signUpEmailInput = document.getElementById("sign-up-email-input");
const controlEmail = document.getElementById("control-email");
const telephoneNumberInput = document.getElementById("telephone-number-input");
const controlTelephoneNumber = document.getElementById("control-telephone-number");

const dateInput = document.getElementById("date-input");
const controlDateOfOrder = document.getElementById("control-date-of-order");

/*
nameAndSurnameInput.value = '';
signUpEmailInput.value = '';
telephoneNumberInput.value = '';
dateInput.value = '';
*/

function removeError() {
    if(controlName && controlEmail && controlTelephoneNumber && controlDateOfOrder) {
        controlName.classList.add("visually-hidden");
        controlEmail.classList.add("visually-hidden");
        controlTelephoneNumber.classList.add("visually-hidden");
        controlDateOfOrder.classList.add("visually-hidden");
    }
}

removeError();

const cartDisplay = document.getElementById('cart-display-container');
const cakes = JSON.parse(localStorage.getItem('cart')) || [];
let userLang = localStorage.getItem('lang') || 'en';
if(userLang === 'cz') {
    userLang = 'cs'
}

renderCart(cakes, cartDisplay);

const completeOrder = document.getElementById('complete-order');


flatpickr("#date-input", {
    locale: userLang,
    dateFormat: "d.m.Y", // Format: 15.07.2025
    minDate: new Date().fp_incr(2), // In 2 days minimum
    disable: [
        "2025-07-18",

        function(date) {
            return (date.getDay() === 0); // Sunday
        }
    ]
});


const proceedToPayment = document.getElementById('proceed-to-payment');


if(proceedToPayment) {
    proceedToPayment.addEventListener('click', () => {
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


        if(dateInput.value === '') {
            controlDateOfOrder.classList.remove('visually-hidden');
            controlDateOfOrder.textContent = "Please select a date";
            controlDateOfOrder.setAttribute("data-i18n", "valid_order");
            addErrorStyles(controlDateOfOrder);
        }

        const dataOfCart = JSON.parse(localStorage.getItem("cart"));


        // translatePage(localStorage.getItem('lang'));
        if(validateNameAndSurname() && validateTelephoneNumber() && validateEmailSignUp() && dateInput.value !== '') {
            const amountText = document.querySelector('#total-amount span').textContent;

            const orderData = {
                name: nameAndSurnameInput.value,
                email: signUpEmailInput.value,
                telephoneNumber: telephoneNumberInput.value,
                date: dateInput.value,
                totalAmount: amountText,
                items: dataOfCart
            };
            //console.log(orderData);

            localStorage.setItem('orderData', JSON.stringify(orderData));
            removeError();
            window.location.href='./payment.html';
        }
    })
}

const userData = JSON.parse(localStorage.getItem('userData'));

if(nameAndSurnameInput && signUpEmailInput && telephoneNumberInput) {
    if(userData && Object.keys(userData).length > 0) {
        // console.log("Ok: ", + userData);
        nameAndSurnameInput.value = userData.name;
        signUpEmailInput.value = userData.email;
        if(userData.email) {
            telephoneNumberInput.value = userData.telephoneNumber;
        }
    } else {
        // console.log("userData is empty:" + userData);
    }
}




