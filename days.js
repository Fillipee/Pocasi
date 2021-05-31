//Zobrazí dny
const dny = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

function showDays() {        
    for (i = 0; i < 6; i++) {
        //ItemDiv
        let item = document.createElement("DIV");
        item.className = "item";
        let pocasiDiv = document.getElementById("pocasi");
        pocasiDiv.appendChild(item);
        //DenDiv
        let denDiv = document.createElement("DIV");
        denDiv.className = "den";
        denDiv.id = "den_" + (i + 1);
        item.appendChild(denDiv);
        //Dny
        let date = new Date();
        if (i == 0) {
            denDiv.innerHTML = "Nyní";   
        } else {            
            date.setDate(new Date().getDate() + (i - 1));
            date = date.getDay();
            denDiv.innerHTML = dny[date];
        }
        //StupeňDiv
        let stupneDiv = document.createElement("DIV");
        stupneDiv.className = "stupne";
        stupneDiv.id = "stupne_" + (i + 1);
        item.appendChild(stupneDiv);        
    }
}

showDays();