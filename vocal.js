if(message.member.voiceChannel)
{
    if(!message.guild.voiceConnection)
    {
        message.member.voiceChannel.join()
            .then(connection >{
                message.reply("Vocal rejoint avec succès !")
            });
    }
}
else
{
    message.reply("Tu dois être dans un vocal !");
}
