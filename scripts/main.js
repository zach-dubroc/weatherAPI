
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
}


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

    } else {
        //console.log("Ready State -> " + this.readyState);
        if (this.status !== 200) {
            this.onerror = Error();
        } //    
    }//end if



    //run weatherdata requst on Id, x and y
}//end function
function Error() {
    alert("error");
}//end functon



