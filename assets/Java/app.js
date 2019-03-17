// Firebase
var config = {
    apiKey: "AIzaSyAorEyD1kHR6zBYi9g8tYPzikRLssCaH5M",
    authDomain: "eventide-9c716.firebaseapp.com",
    databaseURL: "https://eventide-9c716.firebaseio.com",
    projectId: "eventide-9c716",
    storageBucket: "eventide-9c716.appspot.com",
    messagingSenderId: "467410793217"
  };
  firebase.initializeApp(config);

var database = firebase.database();


function commentInput(event){
    event.preventDefault();
    var userName = $("#Username").val().trim();
    var userComment = $("#tComment").val().trim();
    console.log(userName);
    console.log(userComment)
    if (userName != "" && userComment !=""){
        $("#data-validation2").css("display", "none")
    // creates the comment variable to be pushed into Firebase
    var addComment = {
        name: userName,
        comment: userComment
    }

    // pushes the the variable into Firebase
    database.ref().push(addComment);
    } else{
        $("#data-validation2").css("display", "inline");
        $("#warning2").css("background-color", "red").css("border-radius", "5px")
    }
    // Clears the comments fields
    $("#Username").val("");
    $("#tComment").val("");
}

database.ref().on("child_added", function(childSnapshot){
    var nameOfUser = childSnapshot.val().name;
    var commentUser = childSnapshot.val().comment;
    var newRow = $("<tr>").append(
        $("<td>").text(nameOfUser),
        $("<td>").text(commentUser)
        )

    $("#comment-display").append(newRow)
})

// Inputs name and comment into the database.
$(document).on("click", "#commentsubmit", commentInput)

// SeatGeek function
function seatGeek(event){
    event.preventDefault(); 
    $("#event-display").html("")
    
    var dateInput =  $("#datepicker").val().trim();
    var city =  $("#citypicker").val().trim();

    // This is our data validation!
    if(dateInput != "" && city !=""){
        $("#data-validation").css("display", "none")
    } else{
        $("#data-validation").css("display", "inline");
        $("#warning").css("background-color", "red").css("border-radius", "25px")
    }

    // Converts this input to a format readable by the Seat Geek API!
    var date = moment(dateInput).format("YYYYMMDD") + "T00:00:00"
    console.log("This is the user's date input: "+ date)
    var queryURL = "https://api.seatgeek.com/2/events?datetime_utc=" + date + "&venue.city=" + city + "&client_id=MTU3MzU4MzB8MTU1MjQzODQ4My41Ng";

    // Seat Geek API pulling
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
        
        // returns API results for SeatGeek
        var results = response;
        console.log(results);
        console.log(results.events)

        // For loop for the events
        for (var i = 0; i < results.events.length; i++) {
        
        // Creates variables containing event information
        var eventTitle = results.events[i].title;
        var eventVenue = results.events[i].venue.name;
        var eventAddress = results.events[i].venue.address;
        var eventCityAndZip = results.events[i].venue.extended_address;
        var linkToEvent = results.events[i].url;
        var zip = results.events[i].venue.postal_code;
        var eventImage = $("<img id='event-image'>")
        var eventLongitude = results.events[i].venue.location.lon;
        var eventLatitude = results.events[i].venue.location.lat;
        eventImage.attr("src", results.events[i].performers[0].image);
        
        // Console logs all variables to ensure they are working properly
        console.log("This is the Event Title: " + eventTitle);
        console.log("This is the Event Venue Name: " + eventVenue);
        console.log("This is the Event Address: " + eventAddress);
        console.log("This is the Event's City and Zip Code: " + eventCityAndZip);
        console.log("This is the link to the Event: " + linkToEvent);
        console.log("This is the zip code: " + zip)
        console.log("This is the event's longitude: " + eventLongitude)
        console.log("This is the event's latitude: " + eventLatitude)
        
        // This creates the Event card, 3 restaurant links will be displayed belowed.
        var newEvent = $("<div class='event-div' id='event-div-'"+[i]+"'>").append(
            $(eventImage),
            $("<h5 style='text-decoration:underline;'>").text(eventTitle),
            $("<p>").text(eventVenue),
            $("<p>").text(eventAddress),
            $("<p>").text(eventCityAndZip),
            $("<p><a href='"+linkToEvent+"' target='_blank'>Click here to buy tickets!</a></p>"),
            $("<button type='button' class='btn btn-secondary rest-button' event-number='"+[i]+"' lon='" + eventLongitude + "' lat='" + eventLatitude + "'>See Nearby Restaurants</button>"),
            $("<div id='"+[i]+"'>")
            
        )

        // Adds the events into the Event Display
        $("#event-display").append(newEvent)

        // Clears the inputs
        $("#datepicker").val("")
        $("#citypicker").val("")
    }})}

// Grabs restaurant API
function getRestaurant(input, lat, lon){
    console.log("Restaurant lat and long: " + lat +" & " + lon)

    // Zomato API pulling
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+lon+"&apikey=72838eb63aa133056155ed7f659182a9",
        method: "GET"
    }).then(function(response) {
        // Restaurant Results
        var restResults = response.restaurants;
        console.log(restResults);
        for (var j = 0; j < 3; j++){
            // Creates Restaurant Variables
            var restName = restResults[j].restaurant.name;
            var restCuisine = restResults[j].restaurant.cuisines;
            var restLink = restResults[j].restaurant.url;
            var restAddress = restResults[j].restaurant.location.address;
            
            // Console logs restaurant variables
            console.log(restName);
            console.log(restCuisine);
            
            var restDiv = $("<div class='rest-div' id='rest-"+[j]+"'>").append(
                $("<h5>").text(restName),
                $("<p>").text("Cusine: " + restCuisine),
                $("<p><a href='"+restLink+"' target='_blank'>Click here check it out!</a></p>"),
                $("<p>").text(restAddress)
            )

            // Appends the rest div to the specific event div
            $("#"+input).append(restDiv)
            

            // Closes the For loop
            }

            // This creates the Clear Restaurant button
            var clearRest = $("<button type='button' class='btn btn-danger'>Clear the Restaurants</button>");
            $("#"+input).append(clearRest);
        })}
        
// This is what collect
function clickRestButton(){
        event.preventDefault();
        var restlon = $(this).attr("lon");
        var restlat = $(this).attr("lat")
        var eventNumber = $(this).attr("event-number")
        console.log("This is the Event Number after clicking the button: "+ eventNumber)
        console.log("Rest Lon: " + restlon);
        console.log("Rest Lat: " + restlat)
        console.log("You clicked me!");
        getRestaurant(eventNumber, restlat, restlon);

        }

function restClear(){
    $(".rest-div").css("display", "none")
    $(".btn-danger").css("display", "none")
}

// seatGeek();
$(document).on("click", "#submit", seatGeek);
$(document).on("click", ".rest-button", clickRestButton)
$(document).on("click", ".btn-danger", restClear)
