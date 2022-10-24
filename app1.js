//se declaran las constantes para desplegar y obtener informacion del DOM
const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
CITY = document.querySelector("input"),
LOCATION = document.querySelector("button"),
clima = wrapper.querySelector(".weather-part"),
wIcon = clima.querySelector("img");
let language = "es";

// Variable que guradará la url con la key integrada.
let api;

// >> 1-A ______________________________________________
// Función para luego de presionar enter en el input de CITY, procesa dicha CITY y hace el request a la API.
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



// >> 1-A ______________________________________________
// Función request a la API por CITY, city como parámetro de la misma. Luego llama a la función fetchData.
function reqApiCity(city){
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&lang=${language}&appid=d8df573a71f861d27a7a93e6e190e8a0`;
    fetchData();
};

// >> 1-B ______________________________________________
// Función request a la API por coordenadas, variable position como parámetro de la misma. Position contiene las coordenadas obtenidas por IP del browser. Luego llama a la función fetchData.
function reqApiCoord(position){
    const {latitude, longitude} = position.coords;
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&lang=${language}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
    fetchData();
};

//mensaje de error en el DOM
function errorMessage(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
};
// >> 2 ________________________________________________
// Extraemos los datos con fetch a la API y lo enviamos a weatherData.
// function renderHoursArray(data) {
//     data.map(el=>{
//         let hourRender = blockXhour(el);
//         return hourRender;
//     });
// };

function fetchData(){
    infoTxt.innerText = "Extrayendo datos del clima de la región...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherData(result)).catch(() =>{
        infoTxt.innerText = "UPS! surgió algún inconveniente";
        infoTxt.classList.replace("Pendiente", "error");
    });    
};

// >> 3 ________________________________________________
// Obtenemos información de API del clima y la almacenamos en las siguientes variables. La fución weatherData despliega en el DOM los datos obtenidos de la API api.openweathermap.org.
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
    };    
};