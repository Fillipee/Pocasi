const rain = "#38447e";
const clear = "#3f9df5";
const clouds = "#afb5bb";
const snow = "#ebeced";
const drizzle = "#6984d6";
const thunderstorm = "#2b375c";
const atmosphere = "#b7ccec";

const barvyPocasi = [thunderstorm, rain, drizzle, clear, atmosphere, clouds, snow];
const nazvyPocasi = ["Bouřka", "Prší", "Mrholí", "Jasno", "Mlhavo", "Oblačno", "Sněží"];

for (i = 0; i < 7; i++) {
    //Vytvoří legendaContainer
    let legendaContainer = document.createElement("DIV");
    legendaContainer.className = "legendaContainer";
    let legenda = document.getElementById("legenda");
    legenda.appendChild(legendaContainer);
    
    //Vytvoří rectangle
    let rectangle = document.createElement("DIV");
    rectangle.className = "rectangle";
    rectangle.style.backgroundColor = barvyPocasi[i];
    legendaContainer.appendChild(rectangle);
    
    //Vytvoří popis
    let popis = document.createElement("DIV");
    popis.className = "popis";
    popis.innerHTML = nazvyPocasi[i];

    legendaContainer.appendChild(popis);
    
}
