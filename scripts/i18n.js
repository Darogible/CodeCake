// implementation of opening and closing the language selection
const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');

langToggle.addEventListener("click", () => {
    if(langMenu.classList.contains('visually-hidden')) {
        langMenu.classList.remove('visually-hidden');
    } else {
        langMenu.classList.add('visually-hidden');
    }
})

// if there is a saved language in localStorage, apply it when opening the page
const savedLang = localStorage.getItem('lang');

if(savedLang) {
    translatePage(savedLang);
    // update text in button
    updateLangButton(savedLang);
}


// implementation of updating the value in the language selection button
function updateLangButton(language) {
    const currentLang = document.getElementById('current-lang');
    currentLang.textContent = language.toUpperCase();
}


// implement language selection and send to translation function
const listOfLanguages = document.querySelectorAll('#lang-menu li')

listOfLanguages.forEach(lang => {
    lang.addEventListener('click', () => {
        const selectedLang = lang.getAttribute('data-lang');
        localStorage.setItem('lang', selectedLang);
        location.reload();
        // console.log(selectedLang);
        langMenu.classList.add('visually-hidden');
        // update text in button
        updateLangButton(selectedLang);
        // load and apply translation
        translatePage(selectedLang);
    })
})


function translatePage(language) {
    //console.log("Current language: " + language);

    fetch(`./lang/${language}.json`)
        // check that everything is ok, convert the response to json
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            // translations of all elements with data-i18n
            const elements = document.querySelectorAll('[data-i18n]');
            // loop through elements with data-i18n
            for (let i = 0; i < elements.length; i++) {
                // in element specific value data-i18n
                const element = elements[i];
                // in key specific translation for specific data-i18n
                const key = element.getAttribute('data-i18n');
                const translation = data[key];

                if (translation) {
                    element.textContent = translation;
                }
            }

            // translations of all elements with data-i18n-placeholder
            const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
            // loop through elements with data-i18n-data-i18n-placeholder
            for (let i = 0; i < placeholderElements.length; i++) {
                const element = placeholderElements[i];
                const key = element.getAttribute('data-i18n-placeholder');
                const translation = data[key];

                if (translation) {
                    element.setAttribute('placeholder', translation);
                }
            }
        })
}