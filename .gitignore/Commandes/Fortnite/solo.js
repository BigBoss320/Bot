module.exports = {
solo: function(prefix, message, Discord, request, cleF) {

if(message.content.startsWith(prefix+"fsolo")) {
let base = message.content.split(" ")
let pseudo = base[1]
let plateforme = base[2]
if(!plateforme) plateforme = "pc";
let api = "https://fortnite-api.tresmos.xyz/profile/"+plateforme+"/"+pseudo+"?key="+cleF;
request({url: api, json: true}, function(error, response, body) {
let embed = new DiscordRichEmbed()
.setAuthor(body.info.username+" ("+body.info.plateform+")")
.setTitle("Statistiques Fortnite Solo")
.setThumbnail(body.info.rank)
.setDescription(body.group.solo.wins+" top 1"+body.group.solo.top3+" top 3\n"+body.group.solo.top10+" top 10"+body.group.solo.top25+" top 25")
.addField("Top 1/Matchs", body.group.solo.wins+"/"+body.group.solo.matches+" ("+body.group.solo[8]+"%)")
.addField("K/d", body.group.solo[7]+" k/d")
.addField(Kills", body.group.solo.kills+" kills soit "+body.group.solo.killsPerMatch+" mini par parties.")
.addField("Score Royale", body.group.solo.score)
.addField("Temps de jeu", body.group.solo.timePlayed)
.setTimestamp()
.setFooter(`Commande faite par ${message.author.username}`,`${message.author.displayAvatarURL}`)
.setColor("RANDOM")
message.channel.send({embed});
});
};
}};
