// let estadoClima = {}
// let dia = 0;



// class clima {
//     constructor (hour, temp, hum, wind, desc){
//      this.hour = hour;
//     this.temp = temp;
//     this.hum = hum;
//     this.wind = wind;
//     this.desc = desc;
//     }

// }
//     console.log("ver contenido de objeto estadoClima");
//     console.log(estadoClima);
// /* function nuevoDia (){
//     hora = 0;
//     estadoClima[`dia${dia}`] = {}
//     dia++
// } */
// let hora = 0;
// function nuevaHora (hour, temp, hum, wind, desc){
// // Aqui la destructuración aparentemente si cada corchetes encierra un template string para generar el nombre de la variable, dicho orden de sintaxis genera la anidación de un objeto (dia) contentiendo como atributo el otro objeto (hora). En este caso anulamos el día ya que solo necesitamos la hora.
//     (hour<=24)?estadoClima/* [`dia${dia-1}`] */[`${hour}:00`]= new clima(hour,temp,hum,wind,desc):console.log("formato incorrecto de hora");
// }
// for (let i = 0; i<3; i++){
//     // nuevoDia()
//     let hour = 0;
//     let temp = 10;
//     let hum = 24;
//     let wind = 6;
//     let desc = 4500;
//     for(let j = 0; j<=23; j++){
 
//          hour++
//         nuevaHora(hour, temp, hum, wind, desc)
//     }
// }
// console.dir(estadoClima);

// /* {
//   dia0: {
//     '1:00': clima { hour: 1, temp: 10, hum: 24, wind: 6, desc: 4500 },
//     '2:00': clima { hour: 2, temp: 10, hum: 24, wind: 6, desc: 4500 },
//     '3:00': clima { hour: 3, temp: 10, hum: 24, wind: 6, desc: 4500 },
//     '4:00': clima { hour: */

// // FRAGMENTO DE ARCHIVO test1.js

// // Función iteradora guardada en una variable para disponer en el DOM.
// let arrayXhourDOM = hourRender.map((el)=>{
    
//     let hr=0;
//     extddForecast4d[`laps${hr}`] = new WeatHour(el);
    
//     // hour`${hr}`= new WeatHour(blockXhour(el));
//     hr+=1;
// });

// console.log("RESULTADO arrayXhourDOM");
// console.log(arrayXhourDOM);