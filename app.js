//se declaran las constantes para desplegar y obtener informacion del DOM
const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
CITY = document.querySelector("input"),
LOCATION = document.querySelector("button"),
clima = wrapper.querySelector(".weather-part"),
wIcon = clima.querySelector("img");

// Variable que guradará la url con la key integrada.
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
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=659448f530b1011e83f181f7e97df12e`;
    fetchData();
};

// Función request a la API por coordenadas, variable position como parámetro de la misma. Position contiene las coordenadas obtenidas por IP del browser. Luego llama a la función fetchData.
function validPosition(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=659448f530b1011e83f181f7e97df12e`;
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
        infoTxt.innerText = "UPS! alguna falla surgió";
        infoTxt.classList.replace("Pendiente", "error");
    });
    // Duplicamos el código inecesario para test de variable temp global.
    
    fetch(api).then(res => res.json()).then(result => tempData(result)).catch(() =>{
        infoTxt.innerText = "UPS! alguna falla surgió";
        infoTxt.classList.replace("Pendiente", "error");
    });
    // tempTherm = function tempData(data){let {temp}= data.main;return temp};
    // console.log(temp);
    // return temp;
    
};


// Obtenemos información de API del clima y la almacenamos en las siguientes variables. La fución weatherData despliega en el DOM los datos obtenidos de la API api.openweathermap.org.

// "const {..,..,..}=...;" esta alternativa de asignación crea variables con el mismo nombre de propiedad en el objeto que queremos extraer los valores correspondientes de cada propiedad, como resultado quedan disponibles las variables en forma infigureidual con el mismo nombre de la propiedad que contenía el objeto de origen, así se evita repetir código al tipear la sintaxis "const" el numero de veces por cada valor de las propiedades a extraer en un mismo objeto.

let tempTherm=0;
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
        // tempTherm = temp;

        clima.querySelector(".temp .numb").innerText = Math.floor(temp);
        clima.querySelector(".desc").innerText = description;//no supe como traducir la descripccion que manda la api de ingles
        clima.querySelector(".lugar span").innerText = `${city}, ${country}`;
        clima.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        clima.querySelector(".hum .hum-2").innerText = `${humidity}%`;
        infoTxt.classList.remove("Pendiente", "error");
        infoTxt.innerText = "";
        CITY.value = "";
        wrapper.classList.add("active");
        // ----------------------
        // function thermometer(temp) {
        //     return temp
        // };
        tempTherm = temp;
        console.log(temp);
        console.log(tempTherm);
        return tempTherm ;
    };
    console.log(temp);
    console.log(tempTherm);
    //return tempTherm;
    
};
console.log(tempTherm);
console.log(temp);
// SE ME ESTÁ COMPLICANDO DE CÓMO LOGRAR DISPONIBILIDAD DEL DATO TEPERATURA DE LA CONSTANTE O LA VARIABLE temp y tempTherm RESPECTIVAMENTE
//una posible solución es usar localStorage, investigar como se usa.

// ---------------------------------------------------------
// Otra prueba mas duplicando código para obtener el mismo valor de temp, aparentemente la falla está en la estructura implicita del fetch, por alguna razón que desconozco en cualquie función vilculada al fetch ni permite disponer de los datos internos en la sentencia de dicha función, en este caso creamos la función tempData() y sigue pasando lo mismo sin disponer de temp por fuera, tal vez será realizar toda la estructura de la aplicación del termómetro gráfico dentro de la fución, y seguimos en el mismo caso, ya que los retornos con return para entregar las etiquetas <figura> tal vez no van a salir del mismo bloque?.
function tempData(data) {
    let {temp} = data.main;
    tempTherm = temp;
    console.log(tempTherm);
    console.log(temp);
    return tempTherm;
};
// Ciclo para crear termómetro gráfico mediante css.
// Convertimos a enteros los °C.

console.log(tempTherm);
console.log(temp);
let tempInt = 28;
//nos está fallando esta conversión de los °C, no reconoce la constante temp.

// generamos una variable para alternar incremento o decremento en el ciclo for y decidimos insertar el condicional ternario ya dentro del ciclo for.
// tempDownUp = (tempInt >= 0) ? (+1) : (-1) ;

// Función para adicionar elemento en el html[FALTA TEST OK].
function addElemento(texto){
    var capa = document.getElementById("capa");
    var figure = document.createElement("figure");
    h1.innerHTML = texto;
    capa.appendChild(figure);
};

// Iteración por cada °C para generar columna en colores mediante css [FALTA TEST OK].
for (let temp = 0; temp <= tempInt; temp = (tempInt >= 0) ? (+1) : (-1)) {
    if( temp <(-20)) {
        '<figure class="dangFreezz"></figure>'
    } else if ( temp >=(-20)&&temp<(-10)) {        
        '<figure class="freezz"></figure>'
    } else if ( temp >=(-10)&&temp<(0)) {        
        '<figure class="cool"></figure>'
    } else if ( temp >=(0)&&temp<(15)) {        
        '<figure class="fresh"></figure>'
    } else if ( temp >=(15)&&temp<(30)) {        
        '<figure class="templ"></figure>'
    } else if ( temp >=(30)&&temp<(45)) {        
        '<figure class="heat"></figure>'
    } else {        
        '<figure class="dangHeat"></figure>'
    };
} ;