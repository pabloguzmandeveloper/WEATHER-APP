// Funcionalidad para actualización cada hora.
const dateInit = new Date();
const minuTime = dateInit.getMinutes();
console.log(minuTime);

const timerLap = (60-minuTime)*60000;
console.log(timerLap);

let cityStorage = localStorage.cityStorage;

function timerOut() {
    reqApiCity(cityStorage);
};
console.log(timerOut());

// let timerHour = setTimeout(timerOut,10000);//luego de tantos fallos nos dimos cuenta que esta función setTimeout() solo retorna valor 1, no retorna valores de una función que introduzcamos para guardarla en variable, sino hay que pensar en usar una función que trabaje por afuera para que ejecute funciones con esas variables que queremos usar.

// Función para reloj y fecha actuales.
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;// Completa números a dos decimales.
};
function startTime() {
    const today     = new Date();
    let hr          = today.getHours();
    let min         = today.getMinutes();
    let sec         = today.getSeconds();    
    min = checkTime(min);//Agregar un cero a números <10.
    sec = checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec;
    const monthsEn  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsEs  = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const daysEn    = ['Sunrise', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysEs    = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
    let curWeekDay  = daysEs[today.getDay()].toString();
    const curDay    = today.getDate();
    const curMonth  = monthsEs[today.getMonth()];
    const curYear   = today.getFullYear();
    let date        = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    // Actualización cada 1 segundo.
    const time      = setTimeout(function(){ startTime() }, 1000);
};