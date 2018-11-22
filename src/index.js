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

bot.on('ready', function () {
  //bot.channels.map((chan) => console.log(chan.id, chan.name));
  const chan = bot.channels.get(process.env.DISCORD_CHANNEL_ID);

  if (!chan) {
    console.error('Chan doesn\'t exist, nothing will happen here.');
    return;
  }

  const stream = twitter.stream('statuses/filter', { track: process.env.TWITTER_KEYWORDS });

  stream.on('data', function (tweet) {
    if (tweet && !tweet.retweeted_status) {
      chan.send(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
    }
  });

  stream.on('error', function (error) {
    console.error('Error from twitter:', error.toString());
  });
});



bot.login(process.env.DISCORD_TOKEN);
