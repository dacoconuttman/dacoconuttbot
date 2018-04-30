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
          const viewers = JSON.parse(data)['chatters']["viewers"];
          
          // get this group of viewer's current state from DB
          // modify state
          // store state

          /*
          {
            name: name,
            minutes: 0,
            currency: 0
          }




          */

          console.log(viewers);
          // add shit to database here
      });
  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
}

const updateViewers = (viewers) => {
  const newViewers = viewers.map()
}

setInterval(getViewers, 1000*60);

