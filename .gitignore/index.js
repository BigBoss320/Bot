const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("!");

bot.login(process.env.TOKEN);

bot.on('ready', function() {
       console.log("Le Bot est en ligne !");
};
