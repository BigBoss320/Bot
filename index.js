const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("!");

bot.login("TOKEN");                                 //ID BOT

bot.on('ready', function() {                        //
       console.log("Le Bot est en ligne !");        //Message console
});                                                 //

bot.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    var role = member.guild.roles.find('name', 'Membres');                      //Auto Role
    member.addRole(role);
    channel.send(`${member} join the guild !`);                                 //Join
});

bot.on("guildMemberRemove", member => {
    const channel = member.guild.channels.find(ch => ch.name === 'général');
    channel.send(`${member.user.tag} left the guild !`);                        //Leave
});
