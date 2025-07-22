const cakeJSON = sessionStorage.getItem('currentCake');
const cake = JSON.parse(cakeJSON);
console.log(cake);

const image = document.getElementById('image');
image.src = `./assets/cakes/${cake.id}.jpg`;

const title = document.querySelector('.main-title');
title.textContent = cake.name;

const filling = document.getElementById('filling');
filling.textContent = ` ${cake.filling}`;

const features = document.getElementById('features');
features.textContent = cake.features;
//const featureList = cake.features.map(f => f[userLang]);  // например, userLang = 'ru'
//features.textContent = featureList.join(', ');
console.log('cake.features:', cake.features);



const priceAndWeight = document.querySelector('.price-and-weight');
const price = document.querySelector('.price');
price.textContent = `${cake.price} Kč`;
const weight = document.querySelector('.weight');
weight.textContent = `${cake.weight}g`;

const productDescriptionText = document.getElementById('product-description-text');
productDescriptionText.textContent = cake.description;

