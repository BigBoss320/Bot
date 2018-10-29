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

        case "join":                                                                            //Rejoindre un vocal
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

        case "leave":                                                                           //Quittter le vocal
            message.member.voiceChannel.leave()
                message.reply('Déconnecté du salon vocal.')
                .catch(console.log);
            break;


                
        case "play":                                                                            //Commande !play
            if (!args[1]) {
                message.channel.sendMessage("Donnez un lien !");
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Tu dois d\'abord être dans un salon vocal !");
                return;
            }                                                      
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            var server = servers[message.guild.id];
            server.queue.push(args[1]);
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
                message.channel.sendMessage("Musique en cours de lecture...")
            });
            break;

        case "skip":                                                                            //Commande !skip
            if (message.member.voiceChannel) {
                
                var server = servers[message.guild.id];
                    if (server.dispatcher) server.dispatcher.end();
                        message.channel.sendMessage("Musique suivante...")
            } else {
                message.reply("Tu dois d\'abord être dans un salon vocal !");
            }
            break;

        case "stop":                                                                            //Commande !stop
            if (message.member.voiceChannel) {
                var server = servers[message.guild.id];
                    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                        message.channel.sendMessage("Arrêt de la musique...")
            } else {
                message.reply("Tu dois d\'abord être dans un salon vocal !");
            }
            break;

        case "pause":                                                                           //Commande !pause
            if (message.member.voiceChannel) {
                var server = servers[message.guild.id];
                if (server.dispatcher) server.dispatcher.pause();
                    message.channel.sendMessage("Musique en pause...")
            } else {
                message.reply("Tu dois d\'abord être dans un salon vocal !");
            }
            break;
        
        case "resume":                                                                          //Commande !resume
            if (message.member.voiceChannel) {
                var server = servers[message.guild.id];
                if (server.dispatcher) server.dispatcher.resume();
                    message.channel.sendMessage("Reprise de la musique...") 
            } else {
                message.reply("Tu dois d\'abord être dans un salon vocal !");
            }
            break;

        case "":                                                                                //Bloc vide
            message.reply("veuillez entrer une commande !");
            break;


        default:                                                                                //Fausse commande
            message.channel.sendMessage("Cette commande n'éxiste pas.");
    }
});
