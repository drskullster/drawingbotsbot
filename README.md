# Discord Twitter Feed

Send tweets with specific hashtags to a Discord channel

## Set up

1. Create an application then a bot on Discord: https://discordapp.com/developers/applications/
1. Calculate permissions for your bot here https://discordapi.com/permissions.html#23552
1. Create an app for Twitter (your developer account will need to be verified) https://developer.twitter.com

## Run

1. Copy `.env.dist` to `.env` and fill in your credentials for Discord and Twitter. Also, choose twitter keywords (add hash character for hashtags).
1. `npm install`
1. `node src/index.js`

### Find the Discord channel ID

Uncomment this line to list all channels the bot belongs to :

```bot.channels.map((chan) => console.log(chan.id, chan.name));```
