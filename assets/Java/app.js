var dateAndTime = moment().format('MMMM Do YYYY, h:mm a');
var city = ""

function getInput(){
    // This is designed to get the input from the user. We will need get the inputs from the HTML. 
    
}

function seatGeek(){
    // $("#gifs-display").empty(); We made need this later to clear out the results available. 
    var dateAndTime = "2019-03-16T19:00"
    var city = "Minneapolis"
    var queryURL = "https://api.seatgeek.com/2/events?datetime_utc=" + dateAndTime + "&venue.city=" + city + "&client_id=MTU3MzU4MzB8MTU1MjQzODQ4My41Ng";

    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
        var results = response;
        console.log(results);
})
}

// $(document).on("click", "#submit", seatGeek); We made need this later to input results into the function