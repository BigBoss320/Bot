const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');

var prefix = ("!");
const cleF = (process.env.cleF)

const solo = require("./Commandes/Fortnite/solo.js");
const duo = require("./Commandes/Fortnite/duo.js");
const squad = require("./Commandes/Fortnite/squad.js");
const lifetime = require("./Commandes/Fortnite/lifetime.js");

bot.login(process.env.TOKEN);

bot.on('ready', function() {
       console.log("Le Bot est en ligne !");
});

bot.on('message', message =>{
});
