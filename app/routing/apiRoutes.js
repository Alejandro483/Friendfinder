// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var tableArray = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(tableArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    var newFriend = req.body;
    var newFriendScore= 0;
    var existingFriendScore = 0;
    var totalDifferences = 0;
    var match = 1000;
    var matchInfo = {};

    for (let i = 0; i < tableArray.length; i++) {
      for (let j = 0; j < tableArray[i].scores.length; j++) {
        // add in totalDifference Math.abs('exisiting friend score ' -  'new friend score')
        newFriendScore += Number(newFriend.enteredData[i]);
        existingFriendScore += Number(tableArray[i].enteredData[i]);

        if (Math.abs(newFriendScore - existingFriendScore) < match) {
          match = Math.abs(newFriendScore - existingFriendScore);
          matchInfo = tableArray[i];
          console.log(matchData);
      }
       
        //condition for resetting totalDifference and setting match
      }
      matchData.push(req.body);
    }

    //send match back to client
    res.json(matchInfo);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
