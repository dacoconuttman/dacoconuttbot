// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('../db/viewers');
const https = require('https');

// https://github.com/ovallner/TwitchBot/blob/master/index.js#L44
function getViewers() {
  https.get('https://tmi.twitch.tv/group/user/dacoconuttman/chatters', (resp) => {
      console.log("Attempting to get");
          let data = ''
          resp.on('data', (chunk) => {
              data += chunk;
          });
      resp.on('end', () => {
          //console.log(data)
          //console.log(JSON.parse(data));
          viewers = JSON.parse(data)['chatters']["viewers"];
          console.log(viewers);
          // add shit to database here
      });
  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
}

setInterval(getViewers, 5000);