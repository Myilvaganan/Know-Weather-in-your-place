
/* On loading the page, the event is trigerred */

window.addEventListener('load',()=>{

    let latitude;
    let longitude;

    /* DOM selections */
   
    let timeZone= document.querySelector('.location-timezone');
    let temperature= document.querySelector('.degree');
    let temperature1=document.querySelector('.temperature');
    let degree= document.querySelector('.unit');
    let weatherState= document.querySelector('.weather-des');
    let image= document.querySelector('.image');

   /* weather Updating using openweathermap.com api */

    if(navigator.geolocation){

         /* Getting Current-Location Co-ordinates of longitude and latitude */

        navigator.geolocation.getCurrentPosition(position => {

            longitude=position.coords.longitude;
            latitude=position.coords.latitude;
           
            const url=  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=da27a811c1467d7059b20a5502c1f10e&units=metric`;
            
            /* const url1= `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=da27a811c1467d7059b20a5502c1f10e&units=metric`;
 */
            /* Fetching data from Openweathermap.com */

            fetch(url)
            .then(res=>{
                return res.json();
            })
            .then(data=>{

                console.log(data);
                const {temp} =data.main;
                const {description,icon} =data.weather[0];
                
                /* Setting the icon respective to the temperature using icon id */

                image.setAttribute('src',`https://openweathermap.org/img/wn/${icon}@4x.png`);

                timeZone.textContent=data.name;
                temperature.textContent=Math.floor(temp);
                weatherState.textContent=description;

                /* Temperature conversion- celsius to Farenheit vice versa */

                let farenheit= Math.floor((temp * 9/5) + 32);

                temperature1.addEventListener('click',()=>{
                    if(degree.textContent=== 'C'){
                        degree.textContent= 'F';
                        temperature.textContent= farenheit;
                        console.log(farenheit);
                    }else{
                        degree.textContent='C';
                        temperature.textContent= Math.floor(temp);
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
