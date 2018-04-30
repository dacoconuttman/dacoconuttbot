const ircClient = require('node-irc');
const ircConfig = require('../conf').twitch;

const { port, nick, password, server, channel } = ircConfig;

const client = new ircClient(server, port, nick, nick, password);
client.verbosity = 3;
client.debug = true;

client.on('ready', () => {
  client.join(channel);
  console.log("we're in fam");
  client.say(channel, 'Bot initialized');
});

client.on('CHANMSG', data => {
  console.dir(data);
  const { message, sender } = data;
  if(message.charAt() === '!') { // if we have a command
    const tokens = message.split(' '); // !request song name
    if(tokens[0] === '!ping') {
      client.say(channel, 'pong!');
    } else if(tokens[0] === '!hentai') {
      client.say(channel, 'Squid1 Squid2 Squid3 Squid2 Squid4');
    }
  }
});

client.connect();