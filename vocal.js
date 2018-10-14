Client.on('message', async message => {
        if(message.content === prefix + "help") {
            var aide_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`:robot: Aide.`)
        }
    }
});




client.on('message'), message => {
    if(message.content[0] === prefix) {
        let splitMessage = message.content.split(" ");
        if(splitMessage[0] === prefix + 'play') {
            if(splitMessage.length === 2)
            {
                if(message.member.voiceChannel)
                {
                    message.member.voiceChannel.join().then(connection => {
                        dispatcher = connection.playArbitreryInput(splitMessage[1]);

                        dispatcher.on('error', e => {
                            dispatcher = undefined;
                            console.log(e);
                        });

                        dispatcher.on('end', e => {
                            console.log('Fin du son');
                        })
                    });
                }
                else
                    sendError(message, 'Tu dois être dans un salon vocal pour utiliser cette commande !')
            }
            else
                sendError(message, 'Erreur, problème dans les paramètres.');
        }
        else if(splitMessage[0] === prefix + 'pause') {
           if(dispatcher !== undefined)
            dispatcher.pause();
        }
        else if(splitMessage[0] === prefix + 'resume') {
            if(dispatcher !== undefined)
             dispatcher.resume();
        }
    }
};