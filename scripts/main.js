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

