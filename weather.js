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
    //console.log("Latitude: " + lat + " Longitude: " + lon);
    //Stupně přes lokaci
    let url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=eacd2d0d73c999fa91d10f4c9577a868&units=metric'
    findWeather(url);
  }
  
  getLocation();

//Stupně přes vyhledávač
btn.addEventListener('click', function() {
    let url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + mestoValue.value + '&appid=eacd2d0d73c999fa91d10f4c9577a868&units=metric';

    findWeather(url);
});


function findWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            let pocitadlo = 0; //Kolik dní je mezi prvním a dnem, který je začátkem rozseknutí

            let den;    
            datum = data['list'][0]['dt_txt'];
            den = datum.substr(8, 2); //Den ve formátu např. 03 nebo 28
            let pocetDni = den;    

            let maxTemps;
            let minTemps;        

            let arr = [];
            
            //Projde všechny data na 5 následujících dní
            for (let i = 0; i < 40; i++) {                        

                datum = data['list'][i]['dt_txt']; //Datum
                den = datum.substr(8, 2); //Den ve formátu např. 03 nebo 28

                maxTemps = data['list'][i]['main']['temp_max'];
                minTemps = data['list'][i]['main']['temp_min'];
            
                arr.push([den, maxTemps, minTemps]);
                
                if (pocetDni == den) {
                    pocitadlo++;
                }
            }    
            
            let stupne = []; //Pole pro uložení stupňů
            let count = 0; //Počítadlo pro array stupne[]
            let maxTempFirstDay = -100; //Nejvyšší teplota v prvním dni
            let maxTemp = -100; //Nejvyšší teplota v ostatních dnech
            let minTempFirstDay = 100; //Nejnižší teplota v prvním dni
            let minTemp = 100; //Nejnižší teplota v ostatních dnech
            //Rozdělí do dalších array
            let k, temparray, chunk = 8; // temparray = pole které se rozkouskuje, chunk = určuje po kolika indexech se rozkouskuje (8 * 3 hodin ve dne)
            
            //Zjistí nejvyšší a nejnižší teplotu v prvním dni
            temparray = arr.slice(0, pocitadlo + 1);
            for (i = 0; i < temparray.length; i++) {
                if (temparray[i][1] > maxTempFirstDay) {
                    maxTempFirstDay = temparray[i][1];
                }                
                
                if (temparray[i][2] < minTempFirstDay) {
                    minTempFirstDay = temparray[i][2];
                }
            }
            
            //Uloží hodnoty do stupne[max, min]
            stupne.push([Math.round(maxTempFirstDay), Math.round(minTempFirstDay)]);
            count++;
            //console.log("Nevyšší tepltota v 1. dni: " + maxTempFirstDay);

            //Zjistí nejvyšší teplotu v každém dalším dni
            for (i = pocitadlo, k = arr.length; i < k; i += chunk) {
                temparray = arr.slice(i, i + chunk);
                
                //Projde každé rozkouskované pole a určí jeho max teplotu
                for (let p = 0; p < temparray.length; p++) {
                    if (temparray[p][1] > maxTemp) {
                        maxTemp = temparray[p][1];
                    }

                    if (temparray[p][2] < minTemp) {
                        minTemp = temparray[p][2];
                    }
                }
                stupne.push([Math.round(maxTemp), Math.round(minTemp)]);
                count++;
                maxTemp = -100;
                minTemp = 100;
                //console.log("Nevyšší tepltota v dalším dni: " + maxTemp);
            }
            
            //Hodnoty se zobrazí na stránce
            stupneValue = [];
            for (i = 1; i <= 6; i++) {
                stupneValue[i] = document.getElementById('stupne_' + i);
                stupneValue[i].innerHTML = "<span class='stupne_max'>" + stupne[i - 1][0] + "°</span><span class='stupne_min'>/" + stupne[i - 1][1] + "°</span>";
            }
            
            //console.log(stupne); //Vypíše zaokrouhleně Math.round max a min
            //console.log(arr); //Vypíše každý den, max, min
        });
}