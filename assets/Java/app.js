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
        eventImage.attr("src", results.events[i].performers[0].image);
        
        // Console logs all variables to ensure they are working properly
        console.log("This is the Event Title: " + eventTitle);
        console.log("This is the Event Venue Name: " + eventVenue);
        console.log("This is the Event Address: " + eventAddress);
        console.log("This is the Event's City and Zip Code: " + eventCityAndZip);
        console.log("This is the link to the Event: " + linkToEvent);
        console.log("This is the zip code: " + zip)
        
        // This creates the Event card, 3 restaurant links will be displayed belowed.
        var newEvent = $("<div class='event-div' id='event-div-'"+[i]+"'>").append(
            $(eventImage),
            $("<h5 style='text-decoration:underline;'>").text(eventTitle),
            $("<p>").text(eventVenue),
            $("<p>").text(eventAddress),
            $("<p>").text(eventCityAndZip),
            $("<p><a href='"+linkToEvent+"' target='_blank'>Click here to buy tickets!</a></p>"),
            $("<button type='button' class='btn btn-secondary rest-button' event-number='"+[i]+"' zip-code=" + zip + ">See Nearby Restaurants</button>"),
            $("<div id='"+[i]+"'>")
            
        )

        // Adds the events into the Event Display
        $("#event-display").append(newEvent)

        // Clears the inputs
        $("#datepicker").val("")
        $("#citypicker").val("")
    }})}

// Grabs restaurant API
function getRestaurant(input, zip){
    console.log("Get Rest " + zip)
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?q=" + zip + "&apikey=72838eb63aa133056155ed7f659182a9",
        method: "GET"
    }).then(function(response) {
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
            $("#"+input).append(restDiv)
            

            // Closes the For loop
            }
            var clearRest = $("<button type='button' class='btn btn-danger'>Clear the Restaurants</button>");
            $("#"+input).append(clearRest);
        })}
        
function clickRestButton(){
        event.preventDefault();
        var restZip = $(this).attr("zip-code");
        var eventNumber = $(this).attr("event-number")
        console.log("This is the Event Number after clicking the button: "+ eventNumber)
        console.log("Is this working? " + restZip);
        console.log("You clicked me!");
        getRestaurant(eventNumber, restZip);

        }

function restClear(){
    $(".rest-div").css("display", "none")
    $(".btn-danger").css("display", "none")
}

// seatGeek();
$(document).on("click", "#submit", seatGeek);
$(document).on("click", ".rest-button", clickRestButton)
$(document).on("click", ".btn-danger", restClear)
