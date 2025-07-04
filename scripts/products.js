
function loadingCakeData(){
        fetch(`./data/cakes.json`)
            .then(res => res.json())
            .then( data => {
                //console.log(data);
                renderCardsOfCakes(data);
        })
}

loadingCakeData();


