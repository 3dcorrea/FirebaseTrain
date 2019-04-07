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

$('#addTrainBtn').on("click", function() {
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