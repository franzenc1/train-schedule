
console.log("hello")


// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDUcZTRlRcElRDetMlRGDoDIepDONQkzYU",
    authDomain: "train-schedule-b9995.firebaseapp.com",
    databaseURL: "https://train-schedule-b9995.firebaseio.com",
    projectId: "train-schedule-b9995",
    storageBucket: "train-schedule-b9995.appspot.com",
    messagingSenderId: "870187595732"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destinationName = $("#destination-name").val().trim();
  var firstTrain = moment($("#first-train").val().trim());
  var trainFrequency = $("#frequency").val().trim();
  

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destinationName,
    first: firstTrain,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destinationName);
  console.log(newTrain.firstTrain);
  console.log(newTrain.trainFrequency);

  

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination-name").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});


 





// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val().name);

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationName = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destinationName);
  console.log(firstTrain);
  console.log(frequency);

  var currentTime = moment();
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTrainConverted));
  var tRemainder = diffTime % trainFrequency;
  var minutesAway = trainFrequency - tRemainder;
  var nextTrain = moment().add(minutesAway);

  var newTR = $("<tr>")
  var newTDs = $("<td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td>")
  newTR.html(newTDs)

  $(".table-active").append(newTR);



  // Add each train's data into the table
  // $(".table-active > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
  // frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case