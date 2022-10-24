// dtHour.textContent = "test for ul";
// Select language.

// let hora = "Hora";
// let temperatura = "Temp.";
// let humedad = "Humed.";
// let lluvia = "Lluvia";
// let descripcion = "Descripción";
// let viento = "Viento";

// let hour = "Hour";
// let temperarture = "Temp.";
// let humidity = "Humidity";
// let rain = "Rain";
// let description = "Description";
// let wind = "Wind";

// // ---------------------------------------------------------
// let btLangSpanish = document.getElementById("langEspa");
//     btLangSpanish.addEventListener("click", changeSpanish)
//     function changeSpanish(e){
//         e.preventDefault;
//         dtHour.innerHTML += "<li class=`icon`>Icono</li>"
//         dtHour.innerHTML += "<li class=`hour`>Día/Hora</li>";
//         dtHour.innerHTML += "<li class=`tMaxMin`>T.Max/Min °C</li>";
//         dtHour.innerHTML += "<li class=`humid`>Humedad %</li>";
//         dtHour.innerHTML += "<li class=`rain`>Lluvias mm/h</li>";
//         dtHour.innerHTML += "<li class=`wind`>Vientos km/h</li>";
//         dtHour.innerHTML += "<li class=`descr`>Descripción</li>";;

//         console.log("Respuesta evento");
//     }


// let espanol = dtHour.innerHTML= "<li class='ref'>"
// let english = dtHour.innerHTML

// for (let i = 1; i <= 6; i+=1) {
//     let list= document.createElement("li");
//     list.textContent += "lista"+i;
//     dtHour.appendChild(list);
// };
// for (let i = 1; i <= 6; i+=1) {
//     let list= document.createElement("li");
//     list.textContent += "lista"+i;
//     dtHour.appendChild(list);
// };




// Agregado de nuevos elementos al DOM.
/*
const ul = document.createElement("ul");
const fragment = document.createDocumentFragment();
const IDIOMA = "es";
const CONTENIDO_ESPAÑOL = "Lista";
const CONTENIDO_INGLES = "List ";

for (let i = 1; i <= 5; i++) {
    let li = document.createElement("li");
    if (IDIOMA === "es") li.textContent = `${CONTENIDO_ESPAÑOL} ${i}`;
    else li.textContent = ` ${CONTENIDO_INGLES} ${i}`;
    fragment.append(li);
}

ul.append(fragment);
document.body.append(ul); 
==============================================
const ul = document.createElement("ul");
const IDIOMA = "es";
const CONTENIDO_ESPAÑOL = "Lista";
const CONTENIDO_INGLES = "List";

for (let i = 1; i <= 5; i++) {
    let li = document.createElement("li");
    if (IDIOMA === "es") li.textContent = `${CONTENIDO_ESPAÑOL} ${i}`;
    else li.textContent = ` ${CONTENIDO_INGLES} ${i}`;
    ul.append(li);
}

document.body.append(ul);

*/



// let hourRender = dataXhour.map((el)=>{
//     return blockXhour(el);
// });
// _____________________________________________________________________________________app.js
// generamos una variable para alternar incremento o decremento en el ciclo for y decidimos insertar el condicional ternario ya dentro del ciclo for.
// tempDownUp = (tempInt >= 0) ? (+1) : (-1) ;

// Función para adicionar elemento en el html[FALTA TEST OK].
function addElemento(texto){
    var capa = document.getElementById("capa");
    var figure = document.createElement("figure");
    h1.innerHTML = texto;
    capa.appendChild(figure);
};
// ___________________________________________________________________________________
// "const {..,..,..}=...;" esta alternativa de asignación crea variables con el mismo nombre de propiedad en el objeto que queremos extraer los valores correspondientes de cada propiedad, como resultado quedan disponibles las variables en forma individual con el mismo nombre de la propiedad que contenía el objeto de origen, así se evita repetir código al tipear la sintaxis "const" el numero de veces por cada valor de las propiedades a extraer en un mismo objeto.

// ________________________________________________

function weatherData(data){
    if(data.cod == "404"){
        infoTxt.classList.replace("Pendiente", "error");
        infoTxt.innerText = `${inputField.value} CITY INVÁLIDA, ingrese otra ciudad`;
    }else{
        //guardamos la ciudad para reutilizarla con el temporizador.
        CITY.value !=""?localStorage.cityStorage = CITY.value : localStorage.cityStorage;
        //se seleccionan los datos que nos inmportan del json en forma de objetos y arrays
        // Data para primer hora de consulta.
        console.log(data);
        const {temp,feels_like,humidity} = data.list[0].main;
        console.log(temp,humidity,feels_like);
        const tempMax0 = data.list[0].main.temp_max;
        const tempMin0 = data.list[0].main.temp_min;
        const pressure0 = data.list[0].main.pressure;
        const seaLevel0 = data.list[0].main.sea_level;
        const feelsLike0 = data.list[0].main.feels_like;
        const humidity0 = data.list[0].main.humidity;
        const {description} = data.list[0].weather[0].description;
        const icon0 = data.list[0].weather[0].icon;
        const clouds0 = data.list[0].clouds.all;
        const windSpeed0 = data.list[0].wind.speed;
        const windDeg0 = data.list[0].wind.deg;
        const windGust0 = data.list[0].wind.gust;
        const visibility0 = data.list[0].visibility;
        const probPrecip0 = data.list[0].pop;
        const night_day0 = data.list[0].sys.pod;
        const {city} = data.city.name;
        const {country} = data.city.country;
        const sunrise = data.city.sunrise;
        const sunset = data.city.sunset;  
        // const {temp, temp_min, temp_max, feels_like, humidity} = data.list;
        // const {description, icon} = data.weather[0];
        const clouds = data.clouds.all;
        const {speed , deg, gust} = data.wind;
        const visibility = data.visibility;
        const probPrecip = data.pop;
        const night_day = data.sys.pod;
        
        // Data para pronostico por hora a 4 días.
        clima.querySelector(".temp .numb").innerText = Math.floor(temp);
        clima.querySelector(".desc").innerText = description;
        clima.querySelector(".lugar span").innerText = `${city}, ${country}`;
        clima.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        clima.querySelector(".hum .hum-2").innerText = `${humidity}%`;
        infoTxt.classList.remove("Pendiente", "error");
        infoTxt.innerText = "";
        CITY.value = "";
        wrapper.classList.add("active");