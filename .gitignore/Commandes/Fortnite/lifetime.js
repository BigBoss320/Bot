module.exports = {
lifetime: function(prefix, message, Discord, request, cleF) {

if(message.content.startsWith(prefix+"fstats")) {
let base = message.content.split(" ")
let pseudo = base[1]
let plateforme = base[2]
if(!plateforme) plateforme = "pc";
let api = "https://fortnite-api.tresmos.xyz/profile/"+plateforme+"/"+pseudo+"?key="+cleF;
request({url: api, json: true}, function(error, response, body) {
let embed = new DiscordRichEmbed()
.setAuthor(body.info.username+" ("+body.info.plateform+")")
.setTitle("Statistiques Fortnite")
.setThumbnail(body.info.rank)
.setDescription(body.group.lifetimeStats.wins+" top 1"+body.group.lifetimeStats.top3+" top 3\n"+body.group.lifetimeStats.top10+" top 10"+body.group.lifetimeStats.top25+" top 25")
.addField("Top 1/Matchs", body.group.lifetimeStats.wins+"/"+body.group.lifetimeStats.matches+" ("+body.group.lifetimeStats[8]+"%)")
.addField("K/d", body.group.lifetimeStats[7]+" k/d")
.addField(Kills", body.group.lifetimeStats.kills+" kills soit "+body.group.lifetimeStats.killsPerMatch+" mini par parties.")
.addField("Score Royale", body.group.lifetimeStats.score)
.addField("Temps de jeu", body.group.lifetimeStats.timePlayed)
.setTimestamp()
.setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
.setColor("RANDOM")
message.channel.send({embed});
});
};
}};
