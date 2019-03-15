
function getInput(){
    // This is designed to get the input from the user. We will need get the inputs from the HTML. 
    
}

function seatGeek(){
    // $("#gifs-display").empty(); We made need this later to clear out the results available. 
    var date =  "2019-03-15T00:00:00" //$("#datepicker").val().trim();
    var city = "Minneapolis" //$("#citypicker").val().trim();
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
        
        // Something unnecessary for class - DELETE LATER
        console.log("THIS IS FOR CLASS ON 3/14/19 - Hi Brain!");

        for (var i = 0; i < results.events.length; i++) {
        
        // Creates variables containing event information
        var eventTitle = results.events[i].title;
        var eventVenue = results.events[i].venue.name;
        var eventAddress = results.events[i].venue.address;
        var eventCityAndZip = results.events[i].venue.extended_address;
        var linkToEvent = results.events[i].url
        var zip = results.events[i].venue.postal_code
        
        // Console logs all variables to ensure they are working properly
        console.log("This is the Event Title: " + eventTitle);
        console.log("This is the Event Venue Name: " + eventVenue);
        console.log("This is the Event Address: " + eventAddress);
        console.log("This is the Event's City and Zip Code: " + eventCityAndZip);
        console.log("This is the link to the Event: " + linkToEvent);
        console.log("This is the zip code: " + zip)
    
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?q=" + zip + "&apikey=72838eb63aa133056155ed7f659182a9",
            method: "GET"
        }).then(function(response) {
            console.log("restaurants test " + zip);
            console.log(response);
        });
        
        
        
        // This creates the Event card, 3 restaurant links will be displayed belowed.
        var newEvent = $("<div class='card'>").append(
            $("<h5>").text(eventTitle),
            $("<p>").text(eventVenue),
            $("<p>").text(eventAddress),
            $("<p>").text(eventCityAndZip),
            $("<a id='eventLink'>Click here to buy tickets!</a>"),
            $("#eventLink").attr("href", linkToEvent)
        )
        
        $(".event_rest_row").append(newEvent)
        }



})

}

seatGeek();


// $(document).on("click", "#submit", seatGeek); We made need this later to input results into the function