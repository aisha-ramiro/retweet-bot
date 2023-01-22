var Twit = require(`twit`);

require("dotenv").config();

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

function BotInit() {
  var query = {
    q: "#jjba", 
  };
  Bot.get("search/tweets", query, BotGotLatestTweet);

  function BotGotLatestTweet(error, data, response) {
    if (error) {
      console.log("Não foi possível encontrar os últimos tweets");
    } else {
      var id = {
        id: data.statuses[0].id_str,
      };
    }
    // Neste método será retweetado o tweet localizado
    Bot.post("statuses/retweet/:id", id, BotRetweeted);

    function BotRetweeted(error, response) {
      if (error) {
        console.log("erro" + error);
      } else {
        console.log("Tweet retweetado: " + id.id);
      }
      setInterval(BotInit, 1000*60);
    }
  }
  
}




BotInit();