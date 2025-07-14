import { addErrorStyles } from './register.js';

// return back
const backToOrder = document.getElementById('back-to-order');

backToOrder.addEventListener('click', () => {
    window.history.back();
})

// open and close CVV warning + auto close
const cvvInfo = document.getElementById('cvv-info');
const cvvTooltip = document.getElementById('cvv-tooltip');

cvvInfo.addEventListener('click', () => {
    if(cvvTooltip.classList.contains('visually-hidden')) {
        cvvTooltip.classList.remove('visually-hidden');
        setTimeout(() => {
            cvvTooltip.classList.add('visually-hidden');
        }, 5000);
    } else {
        cvvTooltip.classList.add('visually-hidden');
    }
})


// when entering a card there will be no letters and there will be spaces every 4 characters
document.getElementById('card-number').addEventListener('input', function(e) {
    let input = e.target.value;
    input = input.replace(/\D/g, ''); // remove non numbers
    const groups = input.match(/.{1,4}/g);
    e.target.value = groups ? groups.join(' ') : '';

    paymentDataError.classList.add('visually-hidden');
});

document.getElementById('card-date').addEventListener('input', function(e) {
    let input = e.target.value;
    input = input.replace(/\D/g, ''); // remove non numbers
    if (input.length > 2) {
        input = input.slice(0, 2) + '/' + input.slice(2);
    }
    e.target.value = input; // update the input

    paymentDataError.classList.add('visually-hidden');
});


// user clicked the payment button
const paymentButton = document.getElementById('payment-button');

paymentButton.addEventListener('click', (event) => {
    event.preventDefault();
    startVerification();
});


// simulation of payment verification after data verification
const paymentDataError = document.getElementById('payment-data-error');
paymentDataError.classList.add('visually-hidden'); // default state

function startVerification() {
    const loading = document.getElementById('loading');
    const success = document.getElementById('success');

    if(controlCardData()) {
        loading.classList.remove('visually-hidden');

        let delay = Math.floor(Math.random() * (5000 - 1500 + 1)) + 1500;
        // console.log("delay is: ", delay);
        setTimeout(() => {
            loading.classList.add('visually-hidden');
            relustOfPayment();
        }, delay);
    } else {
        paymentDataError.classList.remove('visually-hidden');
        addErrorStyles(paymentDataError);
    }
}


// check card data, number of characters and date
const cardNumber = document.getElementById('card-number');
const cardDate = document.getElementById('card-date');

function controlCardData() {
    const month = parseInt(cardDate.value.slice(0, 2), 10);
    const year = parseInt(cardDate.value.slice(3, 5), 10);

    const isMonthValid = month >= 1 && month <= 12;
    const isYearValid = year >= 25 && year <= 50;

    if(cardNumber.value.length === 19
        && cardDate.value.length === 5
        && isMonthValid
        && isYearValid
    ) {
        return true;
    } else {
        return false;
    }
}

// payment results modal windows
const successPayment = document.getElementById('success-payment');
const failPayment = document.getElementById('fail-payment');

function relustOfPayment() {
    let isSuccess = false;
    if(cardNumber.value !== '0000 0000 0000 0000') {
        successPayment.classList.remove('visually-hidden');
        isSuccess = true;
    } else {
        failPayment.classList.remove('visually-hidden');
    }

    setTimeout(() => {
        failPayment.classList.add('visually-hidden');
        successPayment.classList.add('visually-hidden');

        if (isSuccess) {
            window.location.href = './index.html';
            createCompletedOrder();
        }
    }, 3000);
}


// close all notifications on any click
document.addEventListener('click', () => {
    if (!failPayment.classList.contains('visually-hidden')) {
        failPayment.classList.add('visually-hidden');
    }

    if(!successPayment.classList.contains('visually-hidden')) {
        successPayment.classList.add('visually-hidden');
    }
});

//cardNumber.value = "1000 1000 1000 1000";
//cardDate.value = "01/30";

function createCompletedOrder() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    //console.log(`Formatted time: ${day}.${month}.${year} ${hours}:${minutes}`);

    let orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
    console.log("orderHistory is: ", orderHistory);

    const orderData = JSON.parse(localStorage.getItem("orderData"));

    if(orderHistory === null || orderHistory === undefined) {
        const newOrderInHistory = {
            id: 1,
            date: `${day}.${month}.${year} ${hours}:${minutes}`,
            name: orderData.name,
            email: orderData.email,
            telephoneNumber: orderData.telephoneNumber,
            pickupDate: orderData.date,
            totalAmount: orderData.totalAmount,
            items: orderData.items
        }
        console.log("(1) newOrderInHistory is: ", newOrderInHistory);
        localStorage.setItem('orderHistory', JSON.stringify([newOrderInHistory]));
    } else {
        let newId = orderHistory.length + 1;
        console.log("newId is: ", newId);

        const newOrderInHistory = {
            id: newId,
            date: `${day}.${month}.${year} ${hours}:${minutes}`,
            name: orderData.name,
            email: orderData.email,
            telephoneNumber: orderData.telephoneNumber,
            pickupDate: orderData.date,
            totalAmount: orderData.totalAmount,
            items: orderData.items
        }
        console.log("(2) newOrderInHistory is: ", newOrderInHistory);
        orderHistory.push(newOrderInHistory);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
    console.log("orderHistory is: ", orderHistory);
    localStorage.removeItem("cart");
    localStorage.removeItem("orderData");
}


const theme = localStorage.getItem("theme");
const paymentForm = document.querySelector('.payment-form');

if(theme === 'dark') {
    paymentForm.style.backgroundColor = 'rgb(30, 30, 30)';
    failPayment.style.backgroundColor = 'rgb(30, 30, 30)';
    successPayment.style.backgroundColor = 'rgb(30, 30, 30)';
    loading.style.backgroundColor = 'rgb(30, 30, 30)';
}