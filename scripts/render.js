
const userLang = localStorage.getItem('lang');

function renderCardsOfCakes(cakesData) {
    // console.log(cakesData);

    const cakesConteiner = document.querySelector('.cakes-container');
    cakesConteiner.innerHTML = ''; // clear before rendering


    cakesData.forEach(cake => {
        const cakeCard = document.createElement('div');
        cakeCard.classList.add('cake-card');

        const img = document.createElement('img');
        img.src = `./assets/cakes/${cake.image}`;
        img.alt = cake.name[userLang];
        cakeCard.appendChild(img);

        // get cake name with translation
        const names = cake.name;
        const title = document.createElement('h3');
        title.textContent = names[userLang]; // localized cake name
        title.classList.add('title');
        cakeCard.appendChild(title);

        // create a string to display the price
        const priceString = document.createElement('div');
        priceString.classList.add('price-string');
        cakeCard.appendChild(priceString);
        const priceText = document.createElement('span');
        priceText.setAttribute('data-i18n', 'price');
        priceText.textContent = `price`;
        priceString.appendChild(priceText);
        const priceNumber = document.createElement('span');
        priceNumber.textContent = priceNumber.textContent = `${cake.price} Kč`;
        priceNumber.classList.add('price-number');
        priceString.appendChild(priceNumber);

        // create a string to display weight
        const weightString = document.createElement('div');
        weightString.classList.add('weight-string');
        cakeCard.appendChild(weightString);
        const weightText = document.createElement('span');
        weightText.textContent = `weight`;
        weightText.setAttribute('data-i18n', 'weight');
        weightString.appendChild(weightText);
        const weightNumber = document.createElement('span');
        weightNumber.textContent = `${cake.weight}g`;
        weightNumber.classList.add('weight');
        weightString.appendChild(weightNumber);

        const filling = document.createElement('span');
        filling.textContent = cake.filling;
        filling.classList.add('filling');
        cakeCard.appendChild(filling);

        // get cake description with translation
        const description = document.createElement('p');
        description.textContent = cake.description[userLang];
        cakeCard.appendChild(description);

        // create add cart button, no logic
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart');
        addToCartButton.textContent = "Add to cart";
        addToCartButton.setAttribute('data-i18n', 'add_to_cart');
        cakeCard.appendChild(addToCartButton);
        /* add all important data about THIS cake to the button */
        addToCartButton.dataset.id = cake.id;
        addToCartButton.dataset.name = JSON.stringify(cake.name);
        addToCartButton.dataset.filling = cake.filling;
        addToCartButton.dataset.price = cake.price;
        addToCartButton.dataset.weight = cake.weight;


        translatePage(userLang); // so that the price and weight lines are translated
        cakesConteiner.appendChild(cakeCard);
    })

}
