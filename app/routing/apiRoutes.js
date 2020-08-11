var friends = require("../data/friends");


module.exports = function (app) {
  // API GET Requests

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // API POST Requests

  app.post("/api/friends", function (req, res) {
   var newScores = req.res.scores;
   var newFriend = '';
   var newFriendImg = '';
   var totalDifference = 50;

   for (var i = 0; i < friends.length; i++) {
    var difference = 0;

    // Compare scores
    for (var j = 0; j < newScores.length; j++) {
        difference += (Math.abs(parseInt(friends[i].scores[j])) - parseInt((newScores[j])));
    };

    if (difference < totalDifference) {
        newFriend = friends[i].name;
        newFriendImg = friends[i].photo;
        totalDifference = difference;
    };
};

// console.log("Total difference: " + diff)

friends.push(req.body); // Add new friend to friends array
res.json({ status: 'OK', name: newFriend, photo: newFriendImg }); // Send back response to browser the best friend match
console.log("Your new best friend is: " + newFriend, newFriendImg);
});
};
