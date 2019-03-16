
function getInput(){
    // This is designed to get the input from the user. We will need get the inputs from the HTML. 
    
}

function seatGeek(){
    // $("#gifs-display").empty(); We made need this later to clear out the results available. 
    var date =  "2019-03-23T00:00:00" //$("#datepicker").val().trim();
    var city = "Chicago" //$("#citypicker").val().trim();
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
        var newEvent = $("<div class='event-div' id='event-info'>").append(
            $(eventImage),
            $("<h5 style='text-decoration:underline;'>").text(eventTitle),
            $("<p>").text(eventVenue),
            $("<p>").text(eventAddress),
            $("<p>").text(eventCityAndZip),
            $("<p><a href="+linkToEvent+">Click here to buy tickets!</a></p>"),
            $("<button type='button' class='btn btn-secondary' id='rest-button' zip-code=" + zip + ">See Nearby Restaurants</button>"),
            
        )

        // Adds the events into the Event Display
        $("#event-display").append(newEvent)
        var appendDiv = ("<div id="+zip+"></div>");
        $("#event-display").append(appendDiv);
        
        // Grabs restaurant API
        function displayRest(){
            var restZip = $(this).attr("zip-code");
            console.log("Is this working? " + restZip);
            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/search?q=" + restZip + "&apikey=72838eb63aa133056155ed7f659182a9",
                method: "GET"
            }).then(function(response) {
                var restaurantResults = response.restaurants;
                console.log(restaurantResults);
                for (var j = 0; j < 3; j++){
                    // Creates Restaurant Variables
                    var restName = restaurantResults[j].restaurant.name;
                    var restCuisine = restaurantResults[j].restaurant.cuisines;
                    
                    // Console logs restaurant varialbes
                    console.log(restName);
                    console.log(restCuisine)
                    
                    var restDiv = $("<div class='rest-div'>").append(
                        $("<h5>").text(restName),
                        $("<p>").text(restCuisine)
                    )
    
                    $(appendDiv).text(restDiv);
                    console.log("What is the " + appendDiv)
                    }
                })
            }
        
        $("#rest-button").on("click", displayRest)
        }
    })
};
        

        
        
       


seatGeek();


// $(document).on("click", "#submit", seatGeek); We made need this later to input results into the function