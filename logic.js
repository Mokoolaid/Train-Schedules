
  // initialize firebase
  var firebaseConfig = {
    apiKey: "AIzaSyB8lvR1njjj5H9DMEc4m44qMLRTThWK4uc",
    authDomain: "train-367b9.firebaseapp.com",
    databaseURL: "https://train-367b9.firebaseio.com",
    projectId: "train-367b9",
    storageBucket: "train-367b9.appspot.com",
    messagingSenderId: "471526878292",
    appId: "1:471526878292:web:f5590d76101c0c9eedd1c1",
    measurementId: "G-0XNDBHK5NT"
      
    };

    // Initialize Firebase
    firebase.initializeApp(config);
  
  // a var to represent the database
   var database = firebase.database();
  // Set interval

  var timing = setInterval(myTimer, 1000);

  function timing(){

    var time = new Time();
    $("current-time").text(d.toLocaleTimeString());
  }

  var frequency = 0;
  var firstTrain = 0;

  $("#add-train-button").on("click", function(event) {
    event.preventDefault(); 
  
    //set user input values to variables
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm");
  frequency = parseInt($("#frequency").val().trim());
  // console.log(typeof firstTrain);
  // Creates local "temporary" object for holding employee data
  console.log(firstTrain);
  console.log(typeof firstTrain);
  var firstTrainConverted = moment(firstTrain, "hh:mm");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
   var minutesTillTrain = frequency - tRemainder;
  console.log(minutesTillTrain);
  // var nextTrain = firstTrainConverted.add(diffTime + minutesTillTrain).minutes();
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrain2 = moment().add(2, "minutes")
  console.log("num1" + nextTrain);
  console.log("num2" + nextTrain2);
  nextTrain = moment(nextTrain).format("HH:mm");
  console.log("num1" + nextTrain);
    // console.log(firstTime);
    // console.log(frequency);
    // console.log(currentTime);
  
  
  
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextTrain: nextTrain,
      minutesTillTrain: minutesTillTrain
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
      // console.log(firstTrain);
      // console.log("Look here");
      // // Current Time
      // var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextTrain;
    var minutesTillTrain = childSnapshot.val().minutesAway;
    
    
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
   
    // console.log(frequency);
         
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");
  });
  
  