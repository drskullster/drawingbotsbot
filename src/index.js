const Discord = require('discord.js');
const Twitter = require('twitter');
require('dotenv').config();

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const bot = new Discord.Client();
let stream;

bot.on('ready', function () {
  //bot.channels.map((chan) => console.log(chan.id, chan.name));
  const chan = bot.channels.get(process.env.DISCORD_CHANNEL_ID);

  if (!chan) {
    console.log('Chan doesn\'t exist, nothing will happen here.');
    return;
  }

  console.log('Connected to Discord Server.');

  if (stream) {
    // stream already started
    console.log('Stream already started.');
    return;
  }

  stream = twitter.stream('statuses/filter', { track: process.env.TWITTER_KEYWORDS });

  stream.on('data', function (tweet) {
    if (tweet && !tweet.retweeted_status) {
      const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
      console.log('New tweet !', url);
      chan.send(url);
    }
  });

  stream.on('error', function (error) {
    console.log('Error from twitter.');
    console.log(error.message);
  });
});

bot.on('error', (error) => {
  console.log("Error from discord.");
  console.log(error.message);
});


bot.login(process.env.DISCORD_TOKEN);
