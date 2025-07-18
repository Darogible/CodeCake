const sidebarFilters = document.getElementById("sidebar-filters");
const filtersButton = document.getElementById("filters-button");

filtersButton.addEventListener("click", () => {
    if(sidebarFilters.classList.contains('visually-hidden')) {
        sidebarFilters.classList.remove('visually-hidden');
        //filtersButton.textContent = 'Close filters';
        filtersButton.setAttribute('data-i18n', 'filters_button_close');
        filtersButton.style.background = '#F88379';
    } else {
        sidebarFilters.classList.add('visually-hidden');
        //filtersButton.textContent = 'Show filters';
        filtersButton.setAttribute('data-i18n', 'filters_button');
        filtersButton.style.background = '#8BE38A';
    }
    const selectedLang = localStorage.getItem('lang') || 'en';
    translatePage(selectedLang);
})


// Update the price when the slider price moves
const priceRange = document.getElementById('price-range');
const priceDisplay = document.getElementById('price-display');

priceRange.addEventListener('input', () => {
    priceDisplay.innerText = priceRange.value + ' Kč';
});

// filtering after pressing the "Apply" button
const applyFiltersButton = document.getElementById("apply-filters-button");

applyFiltersButton.addEventListener("click", () => {
    const selectedPrice = parseInt(priceRange.value);
    //console.log("Price is: " + selectedPrice);

    const selectedFillings = Array.from(document.querySelectorAll('.input-filling:checked'))
        .map(input => input.value);
        // console.log("Selected filling are: " + selectedFillings);

    const selectedWeight = Array.from(document.querySelectorAll('.input-weight:checked'))
        .map(input => input.value);
        // console.log("Selected weights are: " + selectedWeight);

    document.querySelectorAll('.cake-card').forEach((card) => {
        const button = card.querySelector('.add-to-cart');

        const price = parseInt(button.dataset.price);
        const filling = button.dataset.filling;
        let weight = parseInt(button.dataset.weight);


        const priceOk = price <= selectedPrice;
        // if nothing is selected, everything is ok
        const fillingOk = selectedFillings.length === 0 || selectedFillings.includes(filling);

        const weightOk =
            selectedWeight.length === 0 || // if nothing is selected, everything is ok
            (selectedWeight.includes('small') && weight <= 400) ||
            (selectedWeight.includes('medium') && weight > 400 && weight <= 1000) ||
            (selectedWeight.includes('big') && weight > 1000);
        console.log("weightOk is: " + weightOk);

        if (priceOk && fillingOk && weightOk) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

})


// search input handler
const searchInput = document.getElementById("search-input");
const cardsOfCakes = document.querySelectorAll('.cake-card');
console.log(cardsOfCakes);

if(searchInput) {
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        console.log("Input clicked");

        document.querySelectorAll('.cake-card').forEach((card) => {
            console.log(card);
            const title = card.querySelector('.title').textContent.toLowerCase().trim();
            const words = title.split(/\s+/); // split by spaces
            // Check if at least one word starts with the entered text
            const matches = words.some(word => word.startsWith(searchText));

            if (matches) {
                card.classList.remove('visually-hidden');
            } else {
                card.classList.add('visually-hidden');
            }

        });

    });
}



