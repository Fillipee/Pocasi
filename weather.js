const btn = document.getElementById('btn');
let mestoValue = document.getElementById('mesto');

const dny = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];


//Zobrazí dny
function zobrazDny() {
    dnyValue = [];
    let date = new Date();
    let dalsiDen;
    for (i = 2; i < 7; i++) {
        dnyValue[i] = document.getElementById('den_' + i);
        date = new Date();
        date.setDate(new Date().getDate() + (i - 2));
        date = date.getDay();
        dalsiDen = dny[date];
        dnyValue[i].innerHTML = dalsiDen;
    }
}

zobrazDny();


//Lokace a stupně podle lokace
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log("Latitude: " + lat + 
    "<br>Longitude: " + lon);

    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=eacd2d0d73c999fa91d10f4c9577a868&units=metric')
        .then(response => response.json())
        .then(data => {

            let stupne = []; //Pole pro uložení stupňů
            let count = 0;

            let stupen;
            //Projde všechny data na 5 následujících dní
            for (i = 0; i < 40; i++) {

                stupen = data['list'][i]['main']['temp'];
                datum = data['list'][i]['dt_txt'];

                //Poslední data, protože nemusí být v 15 hodin
                if (i == 0 || i == 39) {
                    console.log( i + "první/poslední: " + stupen + "    " + datum);
                    stupne[count] = Math.round(stupen);   
                    count++; 
                }

                //Stupně v 15 hodin
                if (datum.substr(11, 2) == 15 && i != 0) {
                    console.log( i + ": " + stupen + "    " + datum);

                    stupne[count] = Math.round(stupen);
                    count++;
                }  

            }    
            console.log(stupne);
            
            stupneValue = [];
            for (i = 1; i <= 6; i++) {
                stupneValue[i] = document.getElementById('stupne_' + i);
                stupneValue[i].innerHTML = stupne[i - 1] + "°";
            }

        });
  }
  
  getLocation();

//Stupně přes vyhledávač
btn.addEventListener('click', function() {

    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + mestoValue.value + '&appid=eacd2d0d73c999fa91d10f4c9577a868&units=metric')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let stupne = []; //Pole pro uložení stupňů
            let count = 0;

            let stupen;
            //Projde všechny data na 5 následujících dní
            for (i = 0; i < 40; i++) {

                stupen = data['list'][i]['main']['temp'];
                datum = data['list'][i]['dt_txt'];

                //Poslední data, protože nemusí být v 15 hodin
                if (i == 0 || i == 39) {
                    console.log( i + "první/poslední: " + stupen + "    " + datum);
                    stupne[count] = Math.round(stupen);   
                    count++; 
                }

                //Stupně v 15 hodin
                if (datum.substr(11, 2) == 15 && i != 0) {
                    console.log( i + ": " + stupen + "    " + datum);

                    stupne[count] = Math.round(stupen);
                    count++;
                }  

            }    
            console.log(stupne);
            
            stupneValue = [];
            for (i = 1; i <= 6; i++) {
                stupneValue[i] = document.getElementById('stupne_' + i);
                stupneValue[i].innerHTML = stupne[i - 1] + "°";
            }

        });
});