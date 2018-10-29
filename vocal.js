const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");

bot.login("YOUR-TOKEN-HERE");       //ID BOT

const prefix = ("!");

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
};

var servers = {};

bot.on('ready', function() {                        //
       console.log("Le Bot est en ligne !");        //Message console
});                                                 //


bot.on('message', function(message) {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {

        case "join":                                        //join vocal
            if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.reply('Connecté au salon vocal avec succès !');
                    })
                    .catch(console.log);
            } else {
                message.reply('Tu dois d\'abord être dans un salon vocal !');
            }

        case "leave":                                       //leave vocal
            message.member.voiceChannel.leave()
                message.reply('Déconnecté du salon vocal.')
                .catch(console.log);
            break;


                
        case "play":                                                                            //Commande !play
            if (!args[1]) {
                message.channel.sendMessage("Donnez un lien !");                                //
                return;
            }                                                                                   //
            if (!message.member.voiceChannel) {                                                 //
                message.channel.sendMessage("Tu dois d\'abord être dans un salon vocal !");
                return;                                                                         //
            }                                                      
            if(!servers[message.guild.id]) servers[message.guild.id] = {                        //
                queue: []
            };                                                                                  //
            var server = servers[message.guild.id];
            server.queue.push(args[1]);
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;

        case "skip":                                                                            //Commande !skip
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();                                     //
            break;

        case "stop":                                                                            //Commande !stop
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();      //
            break;

        case "pause":                                                                           //Commande !pause
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();                                   //
            break;
        
        case "resume":                                                                          //Commande !resume
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();                                  //
            break;


        default:
            message.channel.sendMessage("Cette commande n'éxiste pas.");
    }
});
