
//GET COORDINATES
const findMe = () => {

    const status = document.querySelector(".status");

    //runs if user allows
    const success = (position) => {
        console.log(position);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        gridPoints(latitude, longitude);

    }
    //runs if user denies
    const error = () => {
        status.textContent = "denied";
    }
    //asks user y/n to allow access, gets location
    navigator.geolocation.getCurrentPosition(success, error);

}//end function

//location button to test with
document.querySelector(".find").addEventListener("click", findMe);


function gridPoints(lat, long){
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/points/${lat},${long}`
    var runAsyncronously = true;

    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = XYCallBack;

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function

function forecastData(officeId, gridX, gridY) {
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast`;
    var runAsyncronously = true;

    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = forecastCallBack;

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function
function XYCallBack() {
    //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (this.status === 200 && this.readyState === 4) {
        //DEBUG
        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(this.responseText);
        const officeId = data.properties.gridId;
        const gridX = data.properties.gridX;
        const gridY = data.properties.gridY;

        forecastData(officeId, gridX, gridY);

    } else if (this.status !== 200) {
        this.onerror = Error();
    }
    //run weatherdata requst on Id, x and y
}//end function

function forecastCallBack() {
        //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    //MAKE CERTAIN RESPONSE IS OK AND READY 
    if (this.status === 200 && this.readyState === 4) {
        var data = JSON.parse(this.responseText);

        console.log(data);
        //Find weather data
        //set 7-day forecast vars

        //set obj for each day
        const day1 = {
            wkDay:           data.properties.periods[0].name,
            iconsrc:         data.properties.periods[0].icon,
            high:            data.properties.periods[0].temperature,
            low:             data.properties.periods[1].temperature,
            morningRain:     data.properties.periods[0].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[1].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[0].relativeHumidity.value,
            eveningHumidity: data.properties.periods[1].relativeHumidity.value,
        }//end obj

        const day2 = {
            wkDay:           data.properties.periods[2].name,
            iconsrc:         data.properties.periods[2].icon,
            high:            data.properties.periods[2].temperature,
            low:             data.properties.periods[3].temperature,
            morningRain:     data.properties.periods[2].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[3].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[2].value,
            eveningHumidity: data.properties.periods[3].relativeHumidity.value,
        }//end obj

        const day3 = {
            wkDay:           data.properties.periods[4].name,
            iconsrc:         data.properties.periods[4].icon,
            high:            data.properties.periods[4].temperature,
            low:             data.properties.periods[5].temperature,
            morningRain:     data.properties.periods[4].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[5].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[4].relativeHumidity.value,
            eveningHumidity: data.properties.periods[5].relativeHumidity.value,
        }//end obj

        const day4 = {
            wkDay:           data.properties.periods[6].name,
            iconsrc:         data.properties.periods[6].icon,
            high:            data.properties.periods[6].temperature,
            low:             data.properties.periods[7].temperature,
            morningRain:     data.properties.periods[6].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[7].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[6].relativeHumidity.value,
            eveningHumidity: data.properties.periods[7].relativeHumidity.value,
        }//end obj

        const day5 = {
            wkDay:           data.properties.periods[8].name,
            iconsrc:         data.properties.periods[8].icon,
            high:            data.properties.periods[8].temperature,
            low:             data.properties.periods[9].temperature,
            morningRain:     data.properties.periods[8].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[9].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[8].relativeHumidity.value,
            eveningHumidity: data.properties.periods[9].relativeHumidity.value,
        }//end obj

        const day6 = {
            wkDay:           data.properties.periods[10].name,
            iconsrc:         data.properties.periods[10].icon,
            high:            data.properties.periods[10].temperature,
            low:             data.properties.periods[11].temperature,
            morningRain:     data.properties.periods[10].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[11].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[10].relativeHumidity.value,
            eveningHumidity: data.properties.periods[11].relativeHumidity.value,
        }//end obj

        const day7 = {
            wkDay:           data.properties.periods[12].name,
            iconsrc:         data.properties.periods[12].icon,
            high:            data.properties.periods[12].temperature,
            morningRain:     data.properties.periods[13].probabilityOfPrecipitation.value,
            eveningRain:     data.properties.periods[12].probabilityOfPrecipitation.value,
            morningHumidity: data.properties.periods[12].relativeHumidity.value,
            eveningHumidity: data.properties.periods[13].relativeHumidity.value,
        }//end obj

        //check for null values
        if (day1.morningRain === null) {
            day1.morningRain = "n/a";
        }
        if (day1.eveningRain === null) {
            day1.eveningRain = "n/a";
        }
        if (day2.morningRain === null) {
            day2.morningRain = "n/a";
        }
        if (day2.eveningRain === null) {
            day2.eveningRain = "n/a";
        }
        if (day3.morningRain === null) {
            day3.morningRain = "n/a";
        }      
        if (day3.eveningRain === null) {
            day3.eveningRain = "n/a";
        }
        if (day4.morningRain === null) {
            day4.morningRain = "n/a";
        }      
        if (day4.eveningRain === null) {
            day4.eveningRain = "n/a";
        }
        if (day5.morningRain === null) {
            day5.morningRain = "n/a";
        }      
        if (day5.eveningRain === null) {
            day5.eveningRain = "n/a";
        }
        if (day6.morningRain === null) {
            day6.morningRain = "n/a";
        }      
        if (day6.eveningRain === null) {
            day6.eveningRain = "n/a";
        }
        if (day7.morningRain === null) {
            day7.morningRain = "n/a";
        }      
        if (day7.eveningRain === null) {
            day7.eveningRain = "n/a";
        }

      //test log
        console.log(day1.wkDay);
        console.log("rain: " +day1.morningRain);
        console.log("rain: " +day1.eveningRain);
        console.log("humid: " +day1.morningHumidity);
        console.log("humid: " +day1.eveningHumidity);
        //error
    } else if (this.status !== 200) {
        this.onerror = Error();
    }
}//end function

function Error() {
    alert("error");
}//end functon



