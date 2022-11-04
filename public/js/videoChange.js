// Creamos galería de imágenes.
const dataVideos = ["public/video/beachSummer.mp4","public/video/snowSun.mp4","public/video/cloudy.mp4","public/video/cityNight.mp4","public/video/palmBeach.mp4","public/video/clear.mp4","public/video/snow.mp4","public/video/snowTrain.mp4","public/video/bestBeach.mp4"];
// Seleccionamos elementos del DOM.
const BackgroundVideo   = document.querySelector(".video");
const clickNext         = document.querySelector(".bt-next");
const clickPrev         = document.querySelector(".bt-prev");
let click               = 0;
// Funciones para funcionalidad CHANGE.
const nextVideo = ()=>{
    if (click<dataVideos.length-1) {
        click += 1;
        BackgroundVideo.innerHTML = "<video class=main__bkgvideo src="+dataVideos[click]+" height='1100' standby='charge' autoplay loop playbackRate muted poster=''></video><script>document.querySelector('video').playbackRate = 0.4;</script>";
    }    
};
const prevVideo = ()=>{
    if (click > 0) {
        click -= 1;
        console.log(click)
        BackgroundVideo.innerHTML = "<video class=main__bkgvideo src="+dataVideos[click]+" height='1100' standby='charge' autoplay loop playbackRate muted poster=''></video><script>document.querySelector('video').playbackRate = 0.4;</script>";
    }    
};
// Capturamos los eventos y ejecutamos funciones.
clickNext.addEventListener("click", nextVideo);
clickPrev.addEventListener("click", prevVideo);