
//selection vars

var day1LowTemp         = document.querySelector("#low1");
var day1HighTemp        = document.querySelector("#hii1");
var day1Icon            = document.querySelector("#day1-icon");
var day1wkDay           = document.querySelector("#wkd1");
var day1MorningRain     = document.querySelector("#day1M-rain");
var day1EveningRain     = document.querySelector("#day1E-rain");
var day1MorningHumidity = document.querySelector("#day1M-humid");
var day1EveningHumidity = document.querySelector("#day1E-humid");

var day2LowTemp         = document.querySelector("#low2");
var day2HighTemp        = document.querySelector("#hii2");
var day2Icon            = document.querySelector("#day2-icon");
var day2wkDay           = document.querySelector("#wkd2");
var day2MorningRain     = document.querySelector("#day2M-rain");
var day2EveningRain     = document.querySelector("#day2E-rain");
var day2MorningHumidity = document.querySelector("#day2M-humid");
var day2EveningHumidity = document.querySelector("#day2E-humid");

var day3LowTemp         = document.querySelector("#low3");
var day3HighTemp        = document.querySelector("#hii3");
var day3Icon            = document.querySelector("#day3-icon");
var day3wkDay           = document.querySelector("#wkd3");
var day3MorningRain     = document.querySelector("#day3M-rain");
var day3EveningRain     = document.querySelector("#day3E-rain");
var day3MorningHumidity = document.querySelector("#day3M-humid");
var day3EveningHumidity = document.querySelector("#day3E-humid");

var day4LowTemp         = document.querySelector("#low4");
var day4HighTemp        = document.querySelector("#hii4");
var day4Icon            = document.querySelector("#day4-icon");
var day4wkDay           = document.querySelector("#wkd4");
var day4MorningRain     = document.querySelector("#day4M-rain");
var day4EveningRain     = document.querySelector("#day4E-rain");
var day4MorningHumidity = document.querySelector("#day4M-humid");
var day4EveningHumidity = document.querySelector("#day4E-humid");

var day5LowTemp         = document.querySelector("#low5");
var day5HighTemp        = document.querySelector("#hii5");
var day5Icon            = document.querySelector("#day5-icon");
var day5wkDay           = document.querySelector("#wkd5");
var day5MorningRain     = document.querySelector("#day5M-rain");
var day5EveningRain     = document.querySelector("#day5E-rain");
var day5MorningHumidity = document.querySelector("#day5M-humid");
var day5EveningHumidity = document.querySelector("#day5E-humid");

var day6LowTemp         = document.querySelector("#low6");
var day6HighTemp        = document.querySelector("#hii6");
var day6Icon            = document.querySelector("#day6-icon");
var day6wkDay           = document.querySelector("#wkd6");
var day6MorningRain     = document.querySelector("#day6M-rain");
var day6EveningRain     = document.querySelector("#day6E-rain");
var day6MorningHumidity = document.querySelector("#day6M-humid");
var day6EveningHumidity = document.querySelector("#day6E-humid");

var day7LowTemp         = document.querySelector("#low7");
var day7HighTemp        = document.querySelector("#hii7");
var day7Icon            = document.querySelector("#day7-icon");
var day7wkDay           = document.querySelector("#wkd7");
var day7MorningRain     = document.querySelector("#day7M-rain");
var day7EveningRain     = document.querySelector("#day7E-rain");
var day7MorningHumidity = document.querySelector("#day7M-humid");
var day7EveningHumidity = document.querySelector("#day7E-humid");


//GET COORDINATES
const findMe = () => {
    const status = document.querySelector(".status");
    //runs if user allows
    const success = (position) => {
        console.log(position);
        status.textContent = "success";
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

//run on page load
findMe();

//location button to test with/add location search option
document.querySelector(".find").addEventListener("click", findMe);

function gridPoints(lat, long){
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/points/${lat},${long}`
    var runAsyncronously = true;
    ajaxRequest.open('GET', url, runAsyncronously);
    ajaxRequest.onreadystatechange = XYCallBack;
    ajaxRequest.send();
}//end function

function forecastData(officeId, gridX, gridY) {
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/gridpoints/${officeId}/${gridX},${gridY}/forecast`;
    var runAsyncronously = true;
    ajaxRequest.open('GET', url, runAsyncronously);
    ajaxRequest.onreadystatechange = forecastCallBack;
    ajaxRequest.send();
}//end function

function XYCallBack() {

   
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
    //200: "OK"
    //4      The request is complete
    //check status and ready sate and JSON parse if both are good
    if (this.status === 200 && this.readyState === 4) {
        var data = JSON.parse(this.responseText);

        console.log(data);
        //Find weather data

        UpdatePage(data);

        //error
    } else if (this.status !== 200) {
        this.onerror = Error();
    }
}//end function

function Error() {
    alert("error");
}//end functon


function UpdatePage(data) {


    //change null values to n/a
    for (var index = 0; index < data.properties.periods.length; index++) {
        if (data.properties.periods[index].probabilityOfPrecipitation.value === null) {
            data.properties.periods[index].probabilityOfPrecipitation.value = "0";
        }
    }
    //day objects for 7 day forecast
    //can do with a single class/array?
    const day1 = {
        isDay: data.properties.periods[0].isDaytime,
        wkDay: data.properties.periods[0].name,
        iconsrc: data.properties.periods[0].icon,
        high: data.properties.periods[0].temperature,
        low: data.properties.periods[1].temperature,
        morningRain: data.properties.periods[0].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[1].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[0].relativeHumidity.value,
        eveningHumidity: data.properties.periods[1].relativeHumidity.value,
    }//end obj

    //swap high and low if night-times
    if (day1.high < day1.low) {
        day1.high = data.properties.periods[1].temperature;
        day1.low = data.properties.periods[0].temperature;

    }

    if (day1.isDay) {
        day1.iconsrc = data.properties.periods[0].icon;
        day1.wkDay = data.properties.periods[0].name;
    } else {

        day1.wkDay = data.properties.periods[1].name;
        day1.iconsrc = data.properties.periods[1].icon;
    }

    //set current day values
    day1Icon.src = day1.iconsrc;
    day1wkDay.innerHTML = day1.wkDay;
    day1MorningHumidity.innerHTML = "&#128167;" + day1.morningHumidity + "%";
    day1EveningHumidity.innerHTML = "&#128167;" + day1.eveningHumidity + "%";
    day1MorningRain.innerHTML = "&#127783;" + day1.morningRain + "%";
    day1EveningRain.innerHTML = "&#127783;" + day1.eveningRain + "%";
    day1HighTemp.innerHTML = "&#x21E7;" + day1.high + "&deg;";
    day1LowTemp.innerHTML = "&#8681;" + day1.low + "&deg;";

    const day2 = {

        isDay: data.properties.periods[2].isDaytime,
        wkDay: data.properties.periods[2].name,
        iconsrc: data.properties.periods[2].icon,
        high: data.properties.periods[2].temperature,
        low: data.properties.periods[3].temperature,
        morningRain: data.properties.periods[2].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[3].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[2].relativeHumidity.value,
        eveningHumidity: data.properties.periods[3].relativeHumidity.value,
    }//end obj

    //swap high and low if night-time
    if (day2.high < day2.low) {
        day2.high = data.properties.periods[3].temperature;
        day2.low = data.properties.periods[2].temperature;
    }
    //set icon and name depending on daytime
    if (!day2.isDay) {
        day2.iconsrc = data.properties.periods[1].icon;
        day2.wkDay = data.properties.periods[1].name;
    }

    //set current day values
    day2Icon.src = day2.iconsrc;
    day2wkDay.innerHTML = day2.wkDay;
    day2MorningHumidity.innerHTML = "&#128167;" + day2.morningHumidity + "%";
    day2EveningHumidity.innerHTML = "&#128167;" + day2.eveningHumidity + "%";
    day2MorningRain.innerHTML = "&#127783;" + day2.morningRain + "%";
    day2EveningRain.innerHTML = "&#127783;" + day2.eveningRain + "%";
    day2HighTemp.innerHTML = "&#x21E7;" + day2.high + "&deg;";
    day2LowTemp.innerHTML = "&#8681;" + day2.low + "&deg;";

    const day3 = {
        isDay: data.properties.periods[4].isDaytime,
        wkDay: data.properties.periods[4].name,
        iconsrc: data.properties.periods[4].icon,
        high: data.properties.periods[4].temperature,
        low: data.properties.periods[5].temperature,
        morningRain: data.properties.periods[4].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[5].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[4].relativeHumidity.value,
        eveningHumidity: data.properties.periods[5].relativeHumidity.value,
    }//end obj

    //swap high and low if night-time
    if (day3.high < day3.low) {
        day3.high = data.properties.periods[5].temperature;
        day3.low = data.properties.periods[4].temperature;
    }
    //set icon and name depending on daytime
    if (!day3.isDay) {
        day3.iconsrc = data.properties.periods[3].icon;
        day3.wkDay = data.properties.periods[3].name;
    }
    //set current day values
    day3Icon.src = day3.iconsrc;
    day3wkDay.innerHTML = day3.wkDay;
    day3MorningHumidity.innerHTML = "&#128167;" + day3.morningHumidity + "%";
    day3EveningHumidity.innerHTML = "&#128167;" + day3.eveningHumidity + "%";
    day3MorningRain.innerHTML = "&#127783;" + day3.morningRain + "%";
    day3EveningRain.innerHTML = "&#127783;" + day3.eveningRain + "%";
    day3HighTemp.innerHTML = "&#x21E7;" + day3.high + "&deg;";
    day3LowTemp.innerHTML = "&#8681;" + day3.low + "&deg;";

    const day4 = {
        isDay: data.properties.periods[6].isDaytime,
        wkDay: data.properties.periods[6].name,
        iconsrc: data.properties.periods[6].icon,
        high: data.properties.periods[7].temperature,
        low: data.properties.periods[6].temperature,
        morningRain: data.properties.periods[6].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[7].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[6].relativeHumidity.value,
        eveningHumidity: data.properties.periods[7].relativeHumidity.value,
    }//end obj

    //swap high and low if night-time
    if (day4.high < day4.low) {
        day4.high = data.properties.periods[7].temperature;
        day4.low = data.properties.periods[6].temperature;
    }
    //set icon and name depending on daytime
    if (!day4.isDay) {
        day4.iconsrc = data.properties.periods[5].icon;
        day4.wkDay = data.properties.periods[5].name;
    }
    //set current day values
    day4Icon.src = day4.iconsrc;
    day4wkDay.innerHTML = day4.wkDay;
    day4MorningHumidity.innerHTML = "&#128167;" + day4.morningHumidity + "%";
    day4EveningHumidity.innerHTML = "&#128167;" + day4.eveningHumidity + "%";
    day4MorningRain.innerHTML = "&#127783;" + day4.morningRain + "%";
    day4EveningRain.innerHTML = "&#127783;" + day4.eveningRain + "%";
    day4HighTemp.innerHTML = "&#x21E7;" + day4.high + "&deg;";
    day4LowTemp.innerHTML = "&#8681;" + day4.low + "&deg;";

    const day5 = {
        isDay: data.properties.periods[8].isDaytime,
        wkDay: data.properties.periods[8].name,
        iconsrc: data.properties.periods[8].icon,
        high: data.properties.periods[8].temperature,
        low: data.properties.periods[9].temperature,
        morningRain: data.properties.periods[8].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[9].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[8].relativeHumidity.value,
        eveningHumidity: data.properties.periods[9].relativeHumidity.value,
    }//end obj


    //swap high and low if night-time
    if (day5.high < day5.low) {
        day5.high = data.properties.periods[9].temperature;
        day5.low = data.properties.periods[8].temperature;
    }
    //set icon and name depending on daytime
    if (!day5.isDay) {
        day5.iconsrc = data.properties.periods[7].icon;
        day5.wkDay = data.properties.periods[7].name;
    }
    //set current day values
    day5Icon.src = day5.iconsrc;
    day5wkDay.innerHTML = day5.wkDay;
    day5MorningHumidity.innerHTML = "&#128167;" + day5.morningHumidity + "%";
    day5EveningHumidity.innerHTML = "&#128167;" + day5.eveningHumidity + "%";
    day5MorningRain.innerHTML = "&#127783;" + day5.morningRain + "%";
    day5EveningRain.innerHTML = "&#127783;" + day5.eveningRain + "%";
    day5HighTemp.innerHTML = "&#x21E7;" + day5.high + "&deg;";
    day5LowTemp.innerHTML = "&#8681;" + day5.low + "&deg;";

    const day6 = {
        isDay: data.properties.periods[10].isDaytime,
        wkDay: data.properties.periods[10].name,
        iconsrc: data.properties.periods[10].icon,
        high: data.properties.periods[10].temperature,
        low: data.properties.periods[11].temperature,
        morningRain: data.properties.periods[10].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[11].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[10].relativeHumidity.value,
        eveningHumidity: data.properties.periods[11].relativeHumidity.value,
    }//end obj


    //swap high and low if night-time
    if (day6.high < day6.low) {
        day6.high = data.properties.periods[11].temperature;
        day6.low = data.properties.periods[10].temperature;
    }
    //set icon and name depending on daytime
    if (!day6.isDay) {
        day6.iconsrc = data.properties.periods[9].icon;
        day6.wkDay = data.properties.periods[9].name;
    }
    //set current day values
    day6Icon.src = day6.iconsrc;
    day6wkDay.innerHTML = day6.wkDay;
    day6MorningHumidity.innerHTML = "&#128167;" + day6.morningHumidity + "%";
    day6EveningHumidity.innerHTML = "&#128167;" + day6.eveningHumidity + "%";
    day6MorningRain.innerHTML = "&#127783;" + day6.morningRain + "%";
    day6EveningRain.innerHTML = "&#127783;" + day6.eveningRain + "%";
    day6HighTemp.innerHTML = "&#x21E7;" + day6.high + "&deg;";
    day6LowTemp.innerHTML = "&#8681;" + day6.low + "&deg;";


    const day7 = {
        isDay: data.properties.periods[12].isDaytime,
        wkDay: data.properties.periods[12].name,
        iconsrc: data.properties.periods[12].icon,
        high: data.properties.periods[12].temperature,
        low: data.properties.periods[13].temperature,
        morningRain: data.properties.periods[12].probabilityOfPrecipitation.value,
        eveningRain: data.properties.periods[13].probabilityOfPrecipitation.value,
        morningHumidity: data.properties.periods[12].relativeHumidity.value,
        eveningHumidity: data.properties.periods[13].relativeHumidity.value,
    }//end obj


    //swap high and low if night-time
    if (day7.high < day7.low) {
        day7.high = data.properties.periods[13].temperature;
        day7.low = data.properties.periods[12].temperature;
    }
    //set icon and name depending on daytime
    if (!day6.isDay) {
        day6.iconsrc = data.properties.periods[11].icon;
        day6.wkDay = data.properties.periods[11].name;
    }
    //set current day values
    day7Icon.src = day7.iconsrc;
    day7wkDay.innerHTML = day7.wkDay;
    day7MorningHumidity.innerHTML = "&#128167;" + day7.morningHumidity + "%";
    day7EveningHumidity.innerHTML = "&#128167;" + day7.eveningHumidity + "%";
    day7MorningRain.innerHTML = "&#127783;" + day7.morningRain + "%";
    day7EveningRain.innerHTML = "&#127783;" + day7.eveningRain + "%";
    day7HighTemp.innerHTML = "&#x21E7;" + day7.high + "&deg;";
    day7LowTemp.innerHTML = "&#8681;" + day7.low + "&deg;";



}








