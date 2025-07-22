const idFromURL = new URLSearchParams(window.location.search);
const orderId = idFromURL.get('id');

// insert order ID number from all orders
const orderSpanId = document.getElementById('order-id');
orderSpanId.textContent = `#${orderId}`;


const userData = JSON.parse(localStorage.getItem("userData"));
const orderHistory = JSON.parse(localStorage.getItem("orderHistory"));

const accountQuestion = document.querySelector('.account-question');
console.log(userData);
if(userData === null) {
    accountQuestion.classList.remove('visually-hidden');
}

const orderDate = document.getElementById('order-date');
const currentOrder = orderHistory.find(order => order.id == orderId);

orderDate.textContent = currentOrder.date;


// create a list of all cakes from the order
const goodsInOrderList = document.querySelector('.goods-in-order-list');

if(goodsInOrderList) {
    currentOrder.items.forEach(item => {
        const cakes = document.createElement('div');
        cakes.classList.add('cakes');
        goodsInOrderList.appendChild(cakes);

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-div');
        cakes.appendChild(imageDiv);

        const image = document.createElement('img');
        image.src = `./assets/cakes/${item.id}.jpg`;
        imageDiv.appendChild(image);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        cakes.appendChild(infoDiv);

        const namesOfCakes = document.createElement('span');
        namesOfCakes.classList.add('names');
        namesOfCakes.textContent = item.name;
        infoDiv.appendChild(namesOfCakes);

        const weightDiv = document.createElement('div');
        weightDiv.classList.add('weight-div');
        infoDiv.appendChild(weightDiv);

        const weightText = document.createElement('span');
        weightText.setAttribute('data-i18n', 'weight');
        weightText.textContent = "Weight: ";
        weightDiv.appendChild(weightText);

        const weight = document.createElement('span');
        weight.classList.add('weight');
        weight.textContent = `${item.weight}g`;
        weightDiv.appendChild(weight);

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('number-div');
        infoDiv.appendChild(quantityDiv);

        const quantityText = document.createElement('span');
        quantityText.setAttribute('data-i18n', 'quantity');
        quantityText.textContent = "Amount: ";
        quantityDiv.appendChild(quantityText);

        const quantity = document.createElement('span');
        quantity.classList.add('number');
        quantity.textContent = item.quantity;
        quantityDiv.appendChild(quantity);

        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price-div');
        infoDiv.appendChild(priceDiv);

        const priceText = document.createElement('span');
        priceText.setAttribute('data-i18n', 'price_per');
        priceText.textContent = "Price per: ";
        priceDiv.appendChild(priceText);

        const price = document.createElement('span');
        price.classList.add('price');
        price.textContent = `${item.price} Kč`;
        priceDiv.appendChild(price);

        const finalPriceDiv = document.createElement('div');
        finalPriceDiv.classList.add('final-price');
        infoDiv.appendChild(finalPriceDiv);

        const finalPriceText = document.createElement('span');
        finalPriceText.setAttribute('data-i18n', 'final_price');
        finalPriceText.textContent = "Total: ";
        finalPriceDiv.appendChild(finalPriceText);

        const finalPrice = document.createElement('span');
        const total = item.price * item.quantity;
        finalPrice.textContent = `${total} Kč`;
        finalPriceDiv.appendChild(finalPrice);
    });
}


const total = document.getElementById('total');
total.textContent = currentOrder.totalAmount;


// filling in additional information about the buyer
const pickupDate = document.getElementById('pickup-date');
pickupDate.textContent = currentOrder.pickupDate;
const customerName = document.getElementById('customer-name');
customerName.textContent = currentOrder.name;
const telephoneNumber = document.getElementById('telephone-number');
if (currentOrder.telephoneNumber) {
    telephoneNumber.textContent = currentOrder.telephoneNumber;
} else {
    const missingTelephoneNumber = document.createElement('span');
    missingTelephoneNumber.setAttribute('data-i18n', 'missing_telephone_number');
    missingTelephoneNumber.textContent = "The phone number was not provided";
    telephoneNumber.appendChild(missingTelephoneNumber);
}

function openRegisterAfterRedirect() {
    sessionStorage.setItem("openSignUp", "true");
}

// Go to the main page
document.getElementById('order-detail-back-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});




