// Funcionalidad para actualización cada hora.
let dateInit = new Date();
let minuTime = dateInit.getMinutes();
console.log(minuTime);

let timerLap = (60 - minuTime)*60000;
console.log(timerLap);

let cityStorage = localStorage.cityStorage;
console.log(typeof(localStorage.cityStorage));

function timerOut() {
    reqApiCity(cityStorage);
};
console.log(timerOut());

// let timerHour = setTimeout(timerOut,10000);//luego de tantos fallos nos dimos cuenta que esta función setTimeout() solo retorna valor 1, no retorna valores de una función que introduzcamos para guardarla en variable, sino hay que pensar en usar una función que trabaje por afuera para que ejecute funciones con esas variables que queremos usar.

// Función para reloj y fecha actuales.
// Completar números a dos decimales.
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
};
function startTime() {
    let today =     new Date();
    let hr =        today.getHours();
    let min =       today.getMinutes();
    let sec =       today.getSeconds();
    //Agregar un cero a números <10.
    min =   checkTime(min);
    sec =   checkTime(sec);
    document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec;
    
    let monthsEn =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthsEs =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let daysEn =    ['Sunrise', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let daysEs =    ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];

    let curWeekDay =    daysEs[today.getDay()].toString();
    let curDay =        today.getDate();
    let curMonth =      monthsEs[today.getMonth()];
    let curYear =       today.getFullYear();
    let date =          curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    // Actualización cada 1 segundo.
    let time = setTimeout(function(){ startTime() }, 1000);
};