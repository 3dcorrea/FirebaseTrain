// I must have done something wrong with Firebase because I could not get Firebase to sync. I kept getting "null". This was what I had in my Firebase:
// train-schedule-5fe74
// Destination: 
// "Name"
// Minutes Away: 
// "Time"
// Next Arrival: 
// "Time"
// Train: 
// "trainNameInput"
// I cant say that I understand Firebase too much at all. I'm sure that with more hands-on experience, I'll have a greater understanding and know what to do.

var config = {
  apiKey: "AIzaSyBkozH79Q48zD8uih-mCz2DOjSWc-zyLDU",
  authDomain: "train-schedule-5fe74.firebaseapp.com",
  databaseURL: "https://train-schedule-5fe74.firebaseio.com",
  projectId: "train-schedule-5fe74",
  storageBucket: "train-schedule-5fe74.appspot.com",
  messagingSenderId: "341891328107"
};
firebase.initializeApp(config);

var database = firebase.database();

$('#addTrainBtn').on("click", function () {
  // This captures the users input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // this creates an object that holds train information
  var newTrain = {
    name: trainName,
    place: destination,
    ftrain: firstTrain,
    freq: frequency
  }

  // This(v) pushes that(^) to the database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // this clears the inputs
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // This prevents the user from moving to new page
  return false;
});

// This creates a firebase listener for adding trains to the database and dynamically creates a row in the html when the user adds a train
database.ref().on("child_added", function (childSnapshot) {
  // This stores childSnapshot as a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  // firstTrain time is pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  var currentTime = moment().format("HH:mm");;
  // This stores the difference between the currentTime and first train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  // This finds the remainder of the time left and stores it in a variable
  var timeRemainder = timeDiff % frequency;
  // This creates a variable to calculate the time until the next train
  var minToTrain = frequency - timeRemainder;
  // this variable is for the next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});