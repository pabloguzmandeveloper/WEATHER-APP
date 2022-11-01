// Función de construcción de datos preparados para renderizar en el DOM.
function blockXhour(data){
    let icon        = data.weather[0].icon
    let timestamp4d = luxon.DateTime.fromSeconds(data.dt).toFormat('HH');
    let hour        = timestamp4d==='00'
                        ?luxon.DateTime.fromSeconds(data.dt).toFormat('d MMM')
                        :timestamp4d;
    let temp_max    = Math.round(data.main.temp_max*10)/10 ;
    let temp_min    = Math.round(data.main.temp_min*10)/10;
    let humidity    = data.main.humidity;
    let rain        = (data.rain)
                        ?(Math.round(data.rain['1h']*10)/10)
                        :"Sin lluvia";
    // Registramos este paso que nos llevó horas el solucionar la propiedad iniciada con un número no permitido en la sintáxis, lo resolvimos con ['string']. también funcionaba con un alias en una desestructuración individual para esa propiedad.
    let description = data.weather[0].description;
    let wind        = Math.round(data.wind.speed*10)/10;
    return {icon, hour , temp_max , temp_min , humidity , rain , wind , description};
};

// Construcción de esqueleto DOM.(TESTS).
const forecastAPI = document.getElementById("forecastAPI");
function render4days(data){
    if (forecastAPI.childElementCount > 0) {
        forecastAPI.innerHTML = "";
        };    
    for (let i = 0; i < data.length; i+=1) {
        let dtHour    = document.createElement("ul");
        dtHour.setAttribute("class", "colHr");
        forecastAPI.appendChild(dtHour);
        const element = data[i];
        console.log(element);
        dtHour.innerHTML += "<li class='hour'>"+element.hour+"</li>";
        dtHour.innerHTML += "<li class='icon'><img src=http://openweathermap.org/img/wn/"+element.icon+"@2x.png alt='iconWeather'></></li>";
        dtHour.innerHTML += "<li class='tMaxMin'>"+element.temp_max+"-"+element.temp_min+"</li>";
        dtHour.innerHTML += "<li class='humid'>"+element.humidity+"</li>";
        dtHour.innerHTML += "<li class='rain'>"+element.rain+"</li>";
        dtHour.innerHTML += "<li class='wind'>"+element.wind+"</li>";
        dtHour.innerHTML += "<li class='descr'>"+element.description+"</li>";
            console.log(element.hour);
    }
};
/* DOCUMENTACIÓN: REFERENCIAS DE CLAVES-PROPIEDADES

cod Parámetro interno
message Parámetro interno
cnt Número de marcas de tiempo devueltas por esta llamada API
list
    list.dt Hora de los datos pronosticados, Unix, UTC
    list.main
        list.main.temp  La temperatura. Valor predeterminado de la unidad: Kelvin, Métrico: Celsius, Imperial: Fahrenheit.
        list.main.feels_like    Este parámetro de temperatura explica la percepción humana del clima. Valor predeterminado de la unidad: Kelvin, Métrico: Celsius, Imperial: Fahrenheit.
        list.main.temp_min  Temperatura mínima en el momento del cálculo. Esta es la temperatura mínima pronosticada (dentro de grandes megalópolis y áreas urbanas), use este parámetro opcionalmente. Valor predeterminado de la unidad: Kelvin, Métrico: Celsius, Imperial: Fahrenheit.
        list.main.temp_max  Temperatura máxima en el momento del cálculo. Esta es la temperatura máxima pronosticada (dentro de grandes megalópolis y áreas urbanas), use este parámetro opcionalmente. Valor predeterminado de la unidad: Kelvin, Métrico: Celsius, Imperial: Fahrenheit.
        list.main.pressure  Presión atmosférica sobre el nivel del mar por defecto, hPa
        list.main.sea_level     Presión atmosférica sobre el nivel del mar, hPa
        list.main.grnd_level    Presión atmosférica a nivel del suelo, hPa
        list.main.humidity      Humedad, %
        list.main.temp_kf       Parámetro interno
    list.weather
        list.weather.id     Identificación de condiciones climáticas
        list.weather.main    Grupo de parámetros meteorológicos (Lluvia, Nieve, Extremo, etc.)
        list.weather.description    Condiciones climáticas dentro del grupo. Puede obtener la salida en su idioma. Más información
        list.weather.icon   Identificación del icono del clima
    list.clouds
        list.clouds.all     Nubosidad, %
    list.wind
        list.wind.speed     Velocidad del viento. Unidad predeterminada: metro/seg. Métrica: metro/seg. Imperial: millas/hora.
        list.wind.deg       Dirección del viento, grados (meteorológicos)
        list.wind.gust      Ráfaga de viento. Unidades: predeterminadas: metros/seg., métricas: metros/seg., imperiales: millas/hora.
    list.rain
        list.rain.1h    Volumen de lluvia de la última hora, mm
    list.snow
        list.snow.1h    Volumen de nieve de la última hora
    list.visibility     Visibilidad media, metros. El valor máximo de la visibilidad es de 10 km.
    list.pop    Probabilidad de precipitación. Los valores del parámetro varían entre 0 y 1, donde 0 es igual a 0%, 1 es igual a 100%
    list.sys
        list.sys.pod    Parte del día (n - noche, d - día)
    list.dt_txt     Hora de los datos pronosticados, ISO, UTC
    city
        city.id Identificación de la ciudad. Tenga en cuenta que la funcionalidad de geocodificador integrado ha quedado obsoleta. Obtenga más información aquí .
        city.name Nombre de la ciudad. Tenga en cuenta que la funcionalidad de geocodificador integrado ha quedado obsoleta. Obtenga más información aquí .
        city.coord
            city.coord.lat  Ubicación geográfica de la ciudad, latitud
            city.coord.lon  Ubicación geográfica de la ciudad, longitud
    country     Código de país (GB, JP, etc.). Tenga en cuenta que la funcionalidad de geocodificador integrado ha quedado obsoleta. Obtenga más información aquí .
    timezone    Desplazamiento en segundos desde UTC
    sunrise     Hora de salida del sol, Unix, UTC
    sunset      Hora del atardecer, Unix, UTC
 */
