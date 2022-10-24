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
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&lang=${language}&appid=d8df573a71f861d27a7a93e6e190e8a0`;
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
    api = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&lang=${language}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
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
    fetch(api).then(res => res.json()).then(result => weatherData(result)).catch(() =>{
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
        //se seleccionan los datos que nos inmportan del json en forma de objetos y arrays
        console.log(data);
        const city = data.city.name;
        const country = data.city.country;
        const {description, id} = data.list[0].weather[0];
        const {temp, feels_like, humidity} = data.list[0].main;

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