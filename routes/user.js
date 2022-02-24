var express = require("express");
var router = express.Router();
// const axios = require('axios');
const fetch = require("node-fetch");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("user/home", { user: true });
});
router.get("/fixture", (req, res) => {
  //   axios.get('https://api.footystats.org/league-matches?key=example&league_id=2012')
  // .then(function (response) {
  //   // handle success
  //   // console.log(response);
  //   try {
  //     const data =  JSON.parse(response)
  //     console.log(data)
  //     res.render('user/fixture',{data:response})
  //   } catch(err) {
  //     console.error(err)
  //   }

  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

  fetch("https://api.footystats.org/league-matches?key=example&league_id=2012")
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.data[0])

      json.data.forEach(function (data) {
        stadiums = Array();
        var stadium = data.stadium_name;
        stadiums.push(stadium);
        var home_names = Array();
        var home = data.home_name;
        home_names.push(home);
        var away_names = Array();
        var away = data.away_name;
        away_names.push(away);
      });

      console.log(stadiums, home_names, away_names);

      res.render("user/fixture", { data: json });
    });
});

module.exports = router;
