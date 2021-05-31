let countriesUl = document.createElement("UL");
countriesUl.id = "countriesUl";
let div = document.getElementById("staty");
div.appendChild(countriesUl);

//Seznam států
let country = ["CZ", "DE", "US", "AU", "GB", "FR"];
let countryLi;

//Vytvoření UL a LI
for (i = 0; i < country.length; i ++) {
    countryLi = document.createElement("LI");
    if (country[i] == "CZ") {
        countryLi.className = "country active"; //Defaultní stát
    } else {
        countryLi.className = "country"; //Ostatní státy
    }
    countryLi.innerHTML = country[i];
    let ul = document.getElementById("countriesUl");
    ul.appendChild(countryLi);    
}

let stat = "CZ"; //Defaultní stát CZ

//Pro každý stýt přidá eventlistener
document.querySelectorAll('.country').forEach(item => {
    item.addEventListener('click', event => {
        //Přepínání class
        active = document.getElementsByClassName("country active");
        active[0].className = "country";
        
        item.className = "country active";

        stat = item.innerHTML;
        
        mesta.length = 0; //Vyresetuje města
        fetch("city.list.json")
        .then(response => response.json())
        .then(data => {        
            for (let i = 0 ; i < data.length; i ++) {
                if (data[i].country == stat) {
                    mesta.push(data[i].name);
                }
            }
            
        });
    });
});
