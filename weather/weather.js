let app={}
app.direction={
    "NNE":"north-northeast", 
    "ENE":"east-northeast", 
    "ESE":"east-southeast", 
    "SSE":"south-southeast", 
    "SSW":"south-southwest", 
    "WSW":"west-southwest", 
    "WNW":"west-northwest",
    "NNW":"north-northwest"
}




document.addEventListener("DOMContentLoaded",function(){
    document.querySelector(".text-center .form-control").addEventListener("keypress",handleSubmitZip)
    document.querySelector("#locationButton").addEventListener("click",handleCurrentLocation)
})

async function handleSubmitZip(e){
    if (e.key === 'Enter') {
        e.preventDefault();
        console.log("submit zip code");

        const zipcode=e.target.value
        console.log(zipcode)

        const api_url='http://api.weatherapi.com/v1/current.json?key=f58a93cd1698482d9d801901211603&q='+zipcode;
        const httpResponse=await fetch(api_url);
    
        const data = await httpResponse.json();
        
        app.city=data.location.name
        app.state=data.location.region

        app.temp=data.current.temp_c
        app.condition=data.current.condition.text
        app.conditionImg=data.current.condition.icon
    
        app.windVelocity=data.current.wind_mph
        app.windDirection=data.current.wind_dir

        console.log(app.conditionImg)

        document.querySelector("#name").innerHTML=app.city
        document.querySelector("#region").innerHTML=app.state
        document.querySelector("#temp").innerHTML=Math.round(app.temp)
        document.querySelector(".img-fluid").src="https:"+app.conditionImg
        document.querySelector(".weather").innerHTML=app.condition
        document.querySelector("#wind_mph").innerHTML=Math.round(app.windVelocity)
        document.querySelector("#wind_direction").innerHTML=app.direction[app.windDirection]

        e.target.value=""
      }

}

async function handleCurrentLocation(e){
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(positionReceived)
}

async function positionReceived(GPS){
    console.log(GPS)
    const latitude=GPS.coords.latitude
    const longitude=GPS.coords.longitude
    //Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
    const api_url='http://api.weatherapi.com/v1/current.json?key=f58a93cd1698482d9d801901211603&q='+latitude+','+longitude;
    const httpResponse=await fetch(api_url);

    const data = await httpResponse.json();
    
    app.city=data.location.name
    app.state=data.location.region

    app.temp=data.current.temp_c
    app.condition=data.current.condition.text
    app.conditionImg=data.current.condition.icon

    app.windVelocity=data.current.wind_mph
    app.windDirection=data.current.wind_dir

    console.log(app.conditionImg)

    document.querySelector("#name").innerHTML=app.city
    document.querySelector("#region").innerHTML=app.state
    document.querySelector("#temp").innerHTML=Math.round(app.temp)
    document.querySelector(".img-fluid").src="https:"+app.conditionImg
    document.querySelector(".weather").innerHTML=app.condition
    document.querySelector("#wind_mph").innerHTML=Math.round(app.windVelocity)
    document.querySelector("#wind_direction").innerHTML=app.direction[app.windDirection]
}