module.exports = {
squad: function(prefix, message, Discord, request, cleF) {

if(message.content.startsWith(prefix+"fsquad")) {
let base = message.content.split(" ")
let pseudo = base[1]
let plateforme = base[2]
if(!plateforme) plateforme = "pc";
let api = "https://fortnite-api.tresmos.xyz/profile/"+plateforme+"/"+pseudo+"?key="+cleF;
request({url: api, json: true}, function(error, response, body) {
let embed = new DiscordRichEmbed()
.setAuthor(body.info.username+" ("+body.info.plateform+")")
.setTitle("Statistiques Fortnite Squad")
.setThumbnail(body.info.rank)
.setDescription(body.group.squad.wins+" top 1"+body.group.squad.top3+" top 3\n"+body.group.squad.top10+" top 10"+body.group.squad.top25+" top 25")
.addField("Top 1/Matchs", body.group.squad.wins+"/"+body.group.squad.matches+" ("+body.group.squad[8]+"%)")
.addField("K/d", body.group.squad[7]+" k/d")
.addField(Kills", body.group.squad.kills+" kills soit "+body.group.squad.killsPerMatch+" mini par parties.")
.addField("Score Royale", body.group.squad.score)
.addField("Temps de jeu", body.group.squad.timePlayed)
.setTimestamp()
.setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
.setColor("RANDOM")
message.channel.send({embed});
});
};
}};
