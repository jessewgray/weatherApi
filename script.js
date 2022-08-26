console.log("hello")
$( document ).ready(function() {
    console.log( "rquery" );
});

var ourButton = window.document.getElementsByClassName("theButton")[0];

const runFunction = function(){
    ourButton.style.color = "red";
}

//const api_url = "https://catfact.ninja/breeds";
let lat = ""
let lon = ""
let city = ""
let country = ""
let cityTemp = ""
let cityMin = ""
let cityMax = ""
let apiKey = "41ed0fa71109712597d1d5e12e282f0d"
let api_url = ""
let second_url = ""

  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    console.log(data[0].country)

    var theLat = Math.floor(data[0].lat)
    var theLon = Math.floor(data[0].lon)

    lat = theLat
    lon = theLon
    city = data[0].name
    country = data[0].country

    console.log(theLat + ", " + theLon)
    console.log(lat + ", " + lon)
    console.log(city)

    if(lat != ""){
        second_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
        getapiTwo(second_url)
    }else{
        console.log("not updated yet" + lon)
    }
    
}


async function getapiTwo(urlTwo) {

    console.log(second_url);
    const response = await fetch(urlTwo);
    var dataTwo = await response.json();
    console.log(dataTwo);
    cityTemp = dataTwo.main.temp;
    cityMin = dataTwo.main.temp_min;
    cityMax = dataTwo.main.temp_max;

    updateThePage();

}


//search city both click or enter
const startUp = function(){
        var theInput = $("input").val()
        console.log(theInput);
        city = theInput;
        api_url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey
        // Calling that async function
        getapi(api_url);
}

//search city on click or enter
var theButton = $("#search")[0];
$(theButton).on("click", function(){
    startUp();
})

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        startUp();
    }
});


const updateThePage = function(){
    $("#answer").empty();
    $("#answer").append(`<p>City: ${city}</p>`);
    $("#answer").append(`<p>Country: ${country}</p>`);
    $("#answer").append(`<p>Current Temp: ${cityTemp} C</p>`);
    $("#answer").append(`<p>Temp Min: ${cityMin} C</p>`);
    $("#answer").append(`<p>Temp Max: ${cityMax} C</p>`);
}