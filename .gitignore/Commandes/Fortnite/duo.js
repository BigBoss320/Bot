module.exports = {
duo: function(prefix, message, Discord, request, cleF) {

if(message.content.startsWith(prefix+"fduo")) {
let base = message.content.split(" ")
let pseudo = base[1]
let plateforme = base[2]
if(!plateforme) plateforme = "pc";
let api = "https://fortnite-api.tresmos.xyz/profile/"+plateforme+"/"+pseudo+"?key="+cleF;
request({url: api, json: true}, function(error, response, body) {
let embed = new DiscordRichEmbed()
.setAuthor(body.info.username+" ("+body.info.plateform+")")
.setTitle("Statistiques Fortnite Duo")
.setThumbnail(body.info.rank)
.setDescription(body.group.duo.wins+" top 1"+body.group.duo.top3+" top 3\n"+body.group.duo.top10+" top 10"+body.group.duo.top25+" top 25")
.addField("Top 1/Matchs", body.group.duo.wins+"/"+body.group.duo.matches+" ("+body.group.duo[8]+"%)")
.addField("K/d", body.group.duo[7]+" k/d")
.addField(Kills", body.group.duo.kills+" kills soit "+body.group.duo.killsPerMatch+" mini par parties.")
.addField("Score Royale", body.group.duo.score)
.addField("Temps de jeu", body.group.duo.timePlayed)
.setTimestamp()
.setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
.setColor("RANDOM")
message.channel.send({embed});
});
};
}};
