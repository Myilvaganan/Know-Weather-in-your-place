
/* Changing background in morning and evening */

let temperature1= document.querySelector('.current-temperature');
let hour = new Date().getHours();

// between 7 PM and 7 AM respectively
if(hour >= 19 || hour <= 7) {
    document.body.className += 'evening';
    temperature1.classList.add('evening');
} else {
    document.body.className += 'morning';
    temperature1.classList.add('morning');
}

/* On loading the page, the event is trigerred */

window.addEventListener('load',()=>{

    let latitude;
    let longitude;

    /* DOM selections */
   
    let timeZone= document.querySelector('.location-timezone');
    let temperature= document.querySelector('.degree');
    let temperature1=document.querySelector('.temperature');
    let degree= document.querySelector('.unit');
    let degree1= document.querySelector('.unit-1');
    let weatherState= document.querySelector('.weather-des');
    let image= document.querySelector('.image');
    let feels_temp= document.querySelector('.feels_temp');

   /* weather Updating using openweathermap.com api */

    if(navigator.geolocation){

         /* Getting Current-Location Co-ordinates of longitude and latitude */

        navigator.geolocation.getCurrentPosition(position => {

            longitude=position.coords.longitude;
            latitude=position.coords.latitude;
            console.log(latitude);
            console.log(longitude);
            const url=  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=da27a811c1467d7059b20a5502c1f10e&units=metric`;
            
            /* Fetching data from Openweathermap.com */

            fetch(url)
            .then(res=>{
                return res.json();
            })
            .then(data=>{

                console.log(data);
                const {temp,feels_like} =data.main;
                const {description,icon} =data.weather[0];
                
                /* Setting the icon respective to the temperature using icon id */

                image.setAttribute('src',`http://openweathermap.org/img/wn/${icon}@4x.png`);

                timeZone.textContent=data.name;
                temperature.textContent=Math.floor(temp);
                weatherState.textContent=description;
                feels_temp.textContent=feels_like;

                /* Temperature conversion- celsius to Farenheit vice versa */

                let farenheit= Math.floor((temp * 9/5) + 32);
                let farenheit_feels= Math.floor((feels_like * 9/5) + 32);

                temperature1.addEventListener('click',()=>{
                    if(degree.textContent=== 'C'){
                        degree.textContent= 'F';
                        degree1.textContent= 'F';
                        temperature.textContent= farenheit;
                        feels_temp.textContent= farenheit_feels;
                        console.log(farenheit);
                    }else{
                        degree.textContent='C';
                        degree1.textContent= 'C';
                        temperature.textContent= Math.floor(temp);
                        feels_temp.textContent= Math.floor(feels_like);
                        console.log(Math.floor(temp));
                    }
                })
            })/* catching the error */
            .catch(err=>{
                console.log(err);
            })     

        })
    }
});



/* ---------------------------------------Project Ends---------------------------------------- */
