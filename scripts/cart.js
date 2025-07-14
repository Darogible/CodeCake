// I record all clicks on the page, if there is one on the 'add-to-cart' I need, then I save it in localStorage
const cartDisplay = document.getElementById('cart-display-container');

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        const button = event.target;
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = button.dataset.price;
        const weight = button.dataset.weight;

        // read the basket, is there anything in localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // check by ID if there is already such a cake in the saved ones
        const existingCake = cart.find (cake => cake.id === id);

        if (existingCake) {
            existingCake.quantity += 1;
        } else {
            cart.push({id, name, price, weight, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Add to the cart: ${name} (ID: ${id}, Price: ${price} Kč, Weight: ${weight}g)`);
        renderCart(JSON.parse(localStorage.getItem('cart')), cartDisplay);
    }
});


export function renderCart(cakesFromLocalStorage, cartDisplay) {
    if (!cartDisplay) {
        console.error("Element cart-display-container not found.");
        return;
    }

    cartDisplay.innerHTML = ''; // clear before rendering

    let totalPrice = 0;

    cakesFromLocalStorage.forEach(cake => {
        const cakeCardCart = document.createElement('div');
        cakeCardCart.classList.add('card-cart');

        const imgCakeCart = document.createElement('img');
        imgCakeCart.src = `./assets/cakes/${cake.id}.jpg`;
        imgCakeCart.alt = cake.name;
        cakeCardCart.appendChild(imgCakeCart);

        const basicInfoAboutCake = document.createElement('div');
        basicInfoAboutCake.classList.add('basic-info-cake');
        cakeCardCart.appendChild(basicInfoAboutCake);

        const nameCakeCart = document.createElement('span');
        nameCakeCart.innerText = cake.name;
        basicInfoAboutCake.appendChild(nameCakeCart);

        const weightAndPriceOfCake = document.createElement('span');
        weightAndPriceOfCake.innerText = `${cake.weight}g | ${cake.price} Kč`;
        basicInfoAboutCake.appendChild(weightAndPriceOfCake);
        totalPrice += cake.price * cake.quantity;
        //console.log("Total price is: " + totalPrice);

        const controlAmount = document.createElement('div');
        controlAmount.classList.add('control');
        cakeCardCart.appendChild(controlAmount);

        const buttonReduceAmount = document.createElement('button');
        buttonReduceAmount.classList.add('button-reduce');
        buttonReduceAmount.textContent = '-';
        controlAmount.appendChild(buttonReduceAmount);

        const amountOfCakes = document.createElement('span');
        amountOfCakes.textContent = cake.quantity;
        controlAmount.appendChild(amountOfCakes);

        const buttonIncreaseAmount = document.createElement('button');
        buttonIncreaseAmount.classList.add('button-increase');
        buttonIncreaseAmount.textContent = '+';
        controlAmount.appendChild(buttonIncreaseAmount);

        buttonReduceAmount.dataset.id = cake.id; // binding cake id
        buttonIncreaseAmount.dataset.id = cake.id;

        buttonReduceAmount.addEventListener('click', handleReduce);
        buttonIncreaseAmount.addEventListener('click', handleIncrease);

        cartDisplay.appendChild(cakeCardCart);
    })

    const totalAmount = document.createElement('div');
    totalAmount.id = 'total-amount';
    cartDisplay.appendChild(totalAmount);

    const totalAmountText = document.createElement('p');
    totalAmountText.setAttribute('data-i18n', 'total_amount');
    totalAmountText.innerText = 'Total order amount: ';
    totalAmount.appendChild(totalAmountText);

    const totalAmountPrice = document.createElement('span');
    totalAmountPrice.innerText = `${totalPrice} Kč`;
    totalAmount.appendChild(totalAmountPrice);

    if (window.location.pathname.includes('index.html')) {
        const completeOrderButton = document.createElement('button');
        completeOrderButton.id = 'complete-order';
        completeOrderButton.textContent = 'Complete order';
        completeOrderButton.addEventListener("click", () => {
            window.location.href = './order.html';
        })
        completeOrderButton.setAttribute('data-i18n', 'complete_order');
        cartDisplay.appendChild(completeOrderButton);
    }


    if(totalPrice === 0) {
        cartDisplay.innerHTML = '';

        const emptyCart = document.createElement('div');
        emptyCart.classList.add('empty-cart');
        cartDisplay.appendChild(emptyCart);

        const cartIsEpmthyText = document.createElement('span');
        cartIsEpmthyText.setAttribute('data-i18n', 'cart_is_empthy');
        cartIsEpmthyText.innerText = "Your cart is empty";
        emptyCart.appendChild(cartIsEpmthyText);

        const totalAmount = document.createElement('div');
        totalAmount.id = 'total-amount';
        cartDisplay.appendChild(totalAmount);

        const totalAmountText = document.createElement('p');
        totalAmountText.setAttribute('data-i18n', 'total_amount');
        totalAmountText.innerText = 'Total order amount: ';
        totalAmount.appendChild(totalAmountText);

        const totalAmountPrice = document.createElement('span');
        totalAmountPrice.innerText = `${totalPrice} Kč`;
        totalAmount.appendChild(totalAmountPrice);
    }
}

const cakes = JSON.parse(localStorage.getItem('cart'));
//console.log(cakes);

// renderCart(cakes, cartDisplay);

let userLang = localStorage.getItem('lang') || 'en';

function handleReduce(event) {
    const id = event.target.dataset.id;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // go through everything to find the one I need by id
    const cakeInCart = cart.find(cake => cake.id === id);

    if (cakeInCart && cakeInCart.quantity > 1) {
        cakeInCart.quantity -= 1;
    } else if (cakeInCart && cakeInCart.quantity === 1) {
        // if quantity is 1 and user pressed "-" the cake will disappear from cart
        cart = cart.filter(cake => cake.id !== id);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(cart, cartDisplay);
    translatePage(userLang);
}

function handleIncrease(event) {
    const id = event.target.dataset.id;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cakeInCart = cart.find(cake => cake.id === id);

    if (cakeInCart) {
        cakeInCart.quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(cart, cartDisplay);
    translatePage(userLang);
}

