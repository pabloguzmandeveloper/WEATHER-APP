//Se declaran las constantes para desplegar y obtener informacion del DOM
let language    = "es";
const wrapper   = document.querySelector(".wrapper");
const CITY      = document.querySelector("input");
const LOCATION  = document.querySelector("button");
const infoTxt   = document.querySelector(".info-Text");
const sunrise   = document.querySelector(".sunriseDt");
const sunset    = document.querySelector(".sunsetDt");
const cityDt    = document.querySelector(".cityDt");
const tempDt    = document.querySelector(".tempDt");
const feelsLike = document.querySelector(".flDt");
const humidityDt= document.querySelector(".humDt");
const maxTemp   = document.querySelector(".maxTemp");
const minTemp   = document.querySelector(".minTemp");
const popIcon   = document.querySelector(".popIcon");
const popDt     = document.querySelector(".popDt");
const pressureDt= document.querySelector(".pressureDt");
const windDt    = document.querySelector(".windDt");
const visibDt   = document.querySelector(".visibDt");

// Variables que guradaran key de API OPENWEATERMAP y la ruta url de la misma API.
const keyAPI = "d8df573a71f861d27a7a93e6e190e8a0"
let api;


// >> Función para luego de presionar enter en el input de CITY, procesa dicha CITY y hace el request a la API.
CITY.addEventListener("keyup", e =>{
    //si está sin escritura CITY el proceso se frena
    if(e.key == "Enter" && CITY.value != ""){
        //funcion request a la API.
        reqApiCity(CITY.value);
        console.log(CITY.value);
        //función request a la API con update por hora.
        setTimeout(timerOut,timerLap);
    }
});
// Función request a la API por CITY, city como parámetro de la misma. Luego llama a la función fetchData.
function reqApiCity(city){
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&lang=${language}&appid=${keyAPI}`;
    fetchData();
};


// Evento que extrae del navegador la ubicación por ip del mismo. 
LOCATION.addEventListener("click", () =>{
        // Obtenidas las coordenadas en el browser, estas se las envian a una función para realizar el request por coordenadas, no por CITY. Si falla se emite alerta.
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(reqApiCoord, errorMessage);
        }else{
            Swal.fire({
                title: 'Tu navegador no permite detectar tu LOCATION',
                text: SON.stringify(error),
                icon: 'error',
                confirmButtonText: 'Continuar'
            });
        }
    }
);
// Función request a la API por coordenadas, variable position como parámetro de la misma. Position contiene las coordenadas obtenidas por IP del browser. Luego llama a la función fetchData.
function reqApiCoord(position){
    const {latitude, longitude} = position.coords;
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&lang=${language}&units=metric&appid=${keyAPI}`;
    fetchData();
};


//mensaje de error en el DOM
function errorMessage(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
};


// Extraemos los datos con fetch a la API y lo enviamos a weatherData.
function fetchData(){
    infoTxt.innerText = "Extrayendo datos del clima de la región...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json())
        .then(result => weatherData(result))
        .catch(() =>{
        infoTxt.innerText = "UPS! surgió algún inconveniente";
        infoTxt.classList.replace("Pendiente", "error");
    });
};


// Obtenemos información de API del clima y la almacenamos en las siguientes variables. La fución weatherData despliega en el DOM los datos obtenidos de la API api.openweathermap.org.
function weatherData(data){
    if(data.cod == "404"){
        infoTxt.classList.replace("Pendiente", "error");
        infoTxt.innerText = `${inputField.value} CITY INVÁLIDA, ingrese otra ciudad`;
    }else{
        //guardamos la ciudad para reutilizarla con el temporizador.
        CITY.value !=""?localStorage.cityStorage = CITY.value : localStorage.cityStorage;
        //se seleccionan los datos que nos inmportan del json en forma de objetos y arrays para datos clima actual.
        console.log(data);
        const dataSunrise = luxon.DateTime.fromSeconds(data.city.sunrise).toFormat('HH:mm');
        const dataSunset = luxon.DateTime.fromSeconds(data.city.sunset).toFormat('HH:mm');
        console.log(dataSunrise);
        const city = data.city.name;
        console.log(city)
        const country = data.city.country;
        const {description, id} = data.list[0].weather[0];
        const {temp, feels_like, humidity, temp_max, temp_min, pressure} = data.list[0].main;
        const popRain = data.list[0].pop;
        const wind = data.list[0].wind.speed;
        const visibility = data.list[0].visibility;
        console.log(temp_max)
        // Renderizado CLIMA ACTUAL.
        sunrise.innerText = dataSunrise;
        sunset.innerText = dataSunset;
        cityDt.innerText = city+", "+country;
        tempDt.innerText = Math.round(temp*10)/10+"°C";
        feelsLike.innerText = Math.round(feels_like*10)/10+"°C";
        humidityDt.innerText = humidity+"%";
        maxTemp.innerText = Math.round(temp_max);
        minTemp.innerText = Math.round(temp_min);
        popDt.innerText = popRain*100+"%";
        umbrella(popRain);
        pressureDt.innerText = pressure+"hPa";
        windDt.innerText = wind+" km/h";
        visibDt.innerText = visibility+"km";
        infoTxt.classList.remove("Pendiente", "error");
        infoTxt.innerText = "";
        CITY.value = "";
        wrapper.classList.add("active");        
        // Rederizado CLIMA FUTURO POR HORA.
        // Segmentamos la información para el bloque de datos de los 4 días (array de datos por hora, particularmente 96hs resultando 4 días de pronóstico).
        let dataXhour = data.list;
        console.log(data.list);
        // Función iteradora guardada en una variable para disponer en el DOM.
        let hourRender = dataXhour.map(el=>{
            return blockXhour(el);
        });
        render4days(hourRender);
    };
};