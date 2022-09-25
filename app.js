//se declaran las constantes para desplegar y obtener informacion del DOM
const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
CITY = document.querySelector("input"),
LOCATION = document.querySelector("button"),
clima = wrapper.querySelector(".weather-part"),
wIcon = clima.querySelector("img");

// Variable que guradará la url con la key integrada
let api;

// Función para luego de presionar enter en el input de CITY, procesa dicha CITY y hace el request a la API.
CITY.addEventListener("keyup", e =>{
    //si está sin escritura la CITY el proceso se frena
    if(e.key == "Enter" && CITY.value != ""){
        //funcion para hacer request a la API
        solicitudApi(CITY.value);
    }
});

// Evento que extrae del navegador la ubicación por ip del mismo. 
LOCATION.addEventListener("click", () =>{
        // Obtenidas las coordenadas en el browser, estas se las envian a una función para realizar el request por coordenadas, no por CITY. Si falla se emite alerta.
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(validPosition, errorMessage);
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

// Función request a la API por CITY, city como parámetro de la misma. Luego llama a la función fetchData.
function solicitudApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=d8df573a71f861d27a7a93e6e190e8a0`;
    fetchData();
};

// Función request a la API por coordenadas, variable position como parámetro de la misma. Position contiene las coordenadas obtenidas por IP del browser. Luego llama a la función fetchData.
function validPosition(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d8df573a71f861d27a7a93e6e190e8a0`;
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
        infoTxt.innerText = "UPS! alguna falla sucedió";
        infoTxt.classList.replace("Pendiente", "error");
    });
};


// Obtenemos información de API del clima y la almacenamos en las siguientes variables. La fución weatherData despliega en el DOM los datos obtenidos de la API api.openweathermap.org.

// "const {..,..,..}=...;" esta alternativa de asignación crea variables con el mismo nombre de propiedad en el objeto que queremos extraer los valores correspondientes de cada propiedad, como resultado quedan disponibles las variables en forma individual con el mismo nombre de la propiedad que contenía el objeto de origen, así se evita repetir código al tipear la sintaxis "const" el numero de veces por cada valor de las propiedades a extraer en un mismo objeto.
function weatherData(data){
    if(data.cod == "404"){
        infoTxt.classList.replace("Pendiente", "error");
        infoTxt.innerText = `${inputField.value} CITY INVÁLIDA, ingrese otra ciudad`;
    }else{
        //se seleccionan los datos que nos inmportan del json en forma de objetos y arrays
        console.log(data);
        const city = data.name;
        const country = data.sys.country;
        const {description, id} = data.weather[0];
        const {temp, feels_like, humidity} = data.main;

        clima.querySelector(".temp .numb").innerText = Math.floor(temp);
        clima.querySelector(".desc").innerText = description;//no supe como traducir la descripccion que manda la api de ingles
        clima.querySelector(".lugar span").innerText = `${city}, ${country}`;
        clima.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        clima.querySelector(".hum .hum-2").innerText = `${humidity}%`;
        infoTxt.classList.remove("Pendiente", "error");
        infoTxt.innerText = "";
        CITY.value = "";
        wrapper.classList.add("active");
    }
};

// ---------------------------------------------------------

// Ciclo para listado de datos por cuatro días