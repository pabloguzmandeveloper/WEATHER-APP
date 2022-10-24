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