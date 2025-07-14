// filling the account header
const userData = JSON.parse(localStorage.getItem("userData"));

const profileName = document.querySelector('.profile-name');
if(profileName) {
    profileName.textContent = userData.name;
}


const profileEmail = document.querySelector('.profile-email');
if(profileEmail) {
    profileEmail.textContent = userData.email;
}



// display order history
const profileHistory = document.getElementById('profile-history');
const orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
const profileHistoryMissing = document.querySelector('.profile-history-missing');

if(profileHistory && profileHistoryMissing) {
    if(orderHistory.length > 0){
        profileHistoryMissing.classList.add('visually-hidden');
        console.log(orderHistory);

        const historyTableTitleContainer = document.createElement('div');
        historyTableTitleContainer.classList.add('history-title-table');
        profileHistory.appendChild(historyTableTitleContainer);

        const historyTableDate = document.createElement('span');
        historyTableDate.classList.add('history-date');
        historyTableDate.textContent = "Order date";
        historyTableDate.setAttribute('data-i18n', 'history_date');
        historyTableTitleContainer.appendChild(historyTableDate);

        const historyItems = document.createElement('span');
        historyItems.classList.add('history-items');
        historyItems.textContent = "Items";
        historyItems.setAttribute('data-i18n', 'history_items');
        historyTableTitleContainer.appendChild(historyItems);

        const historyPickupDate = document.createElement('span');
        historyPickupDate.classList.add('history-pickup-date');
        historyPickupDate.textContent = "Pickup date";
        historyPickupDate.setAttribute('data-i18n', 'history_pickup_date');
        historyTableTitleContainer.appendChild(historyPickupDate);

        const historyTotal = document.createElement('span');
        historyTotal.classList.add('history-total');
        historyTotal.textContent = "Total";
        historyTotal.setAttribute('data-i18n', 'history_total');
        historyTableTitleContainer.appendChild(historyTotal);

        orderHistory.forEach(order => {
            // console.log(userData.email, " + ", order.email);
            if(userData.email === order.email) {
                const orderCard = document.createElement('div');
                orderCard.classList.add('order-card');
                orderCard.id = 'order-card';
                profileHistory.appendChild(orderCard);

                const idOrder = document.createElement('span');
                idOrder.innerText = order.id;
                idOrder.classList.add('id-order');
                idOrder.classList.add('visually-hidden');
                orderCard.appendChild(idOrder);

                const date = document.createElement('span');
                date.classList.add('history-date');
                date.id = 'profile-order-date';
                date.innerText = order.date;
                orderCard.appendChild(date);

                const cakesNames = document.createElement('span');
                cakesNames.classList.add('history-items');
                cakesNames.id = 'profile-cakes-names';
                const wordUnits = document.createElement('span');
                // all names of cakes and quantity
                const cakeNamesText = order.items
                    .map(item => `${item.name} (${item.quantity})`)
                    .join(", ");
                cakesNames.innerText = cakeNamesText;
                orderCard.appendChild(cakesNames);

                const pickupDate = document.createElement('span');
                pickupDate.classList.add('history-pickup-date');
                pickupDate.id = 'profile-pickup-date';
                pickupDate.innerText = order.pickupDate;
                orderCard.appendChild(pickupDate);

                const totalAmount = document.createElement('span');
                totalAmount.classList.add('history-total');
                totalAmount.innerText = order.totalAmount;
                orderCard.appendChild(totalAmount);

                if(window.innerWidth < 375){
                    pickupDate.classList.add('visually-hidden');
                    historyPickupDate.classList.add('visually-hidden');
                }
            }
        });
    }
}





profileHistory.addEventListener('click', function (event) {
    const orderCard = event.target.closest('.order-card');
    if (orderCard) {
        console.log("Click on order-card:", orderCard);
        window.location.href = `order-details.html?id=${encodeURIComponent(id)}`;
    }
});

profileHistory.addEventListener('click', function (event) {
    const orderCard = event.target.closest('.order-card');
    if (orderCard) {
        const id = orderCard.querySelector('.id-order')?.innerText; // ?. is an optional chaining
        if (id) {
            // Transition to another page, passing id in URL parameters
            window.location.href = `order-detail.html?id=${id}`;
        }
    }
});





