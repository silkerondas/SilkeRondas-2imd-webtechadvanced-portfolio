class App {
    constructor() {
        console.log("hey!");
        this.getLocation();
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log(lat,lng);
        this.getWeather(lat,lng);
        });
    }
    
    getWeather(lat,lng){
        let appId = "a6eea097e136dee2b7a8185d5d87df4f";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appId}&units=metric`;
        fetch(url)
            .then((response) => {
                return response.json();
        })
            .then((json) => {
                console.log(json);
                let place = json.name;
                let description = json.weather[0].main;
                this.changeText(place, description)

                if(description ==='Clouds'){
                    this.getSwimming();
                } else {
                    console.log(description)
                }
        });   
    }

    getSwimming() {
        let url = "https://sports.api.decathlon.com/sports/224";
        fetch(url)
          .then((response) => {
            console.log(url);
            return response.json();
          })
          .then((json) => {
            console.log(json)
            let swimming = json.data.attributes.name;
            this.changeTextSwimming(swimming);
          })

    }

    changeText(place, description) {
        document.querySelector("#text").innerHTML = `${description} in ${place} today`; 
    }

    changeTextSwimming(swimming) {
        document.querySelector("#text2").innerHTML = `Perfect weather to go ${swimming} today`;
        document.querySelector("#ad").style.backgroundImage = "url(https://www.wigglestatic.com/images/brandpages/2020/Nike/nike-bs-ss20-hero-mob-min.jpg)";
    }
}

let app = new App();