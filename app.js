window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            let temperatureDescription = document.querySelector(".temperature-description");
            let temperatureDegree = document.querySelector(".temperature-degree");
            let locationTimeZone = document.querySelector(".location-timezone");
            let temperatureSection = document.querySelector(".temperature");
            let temperatureSpan =document.querySelector(".temperature span")
        })
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;


        fetch(api)
            .then(response => response.json())
            .then(data => {
                const {temperature, summary, icon} = data.currently

                        
                //SET DOM ELEMENTS
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timeZone;
                //FORMULA OF CELSIUS
                let celsius = (temperature - 32) * (5/9);
                
                //Set icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Celcius/Fahrenheit
                temperatureSection.addEventListener("click", ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius)
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;

                    }
                })
            })

    }
    function setIcons(icon, iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon])
    }
})



