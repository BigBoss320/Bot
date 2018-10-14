'use strict';

const config = require('./config.json');
const commandHelp = require('./help.js');
const tool = require('./tool.js');
const rp = require('request-promise');
const stripIndent = require('strip-indent');

module.exports = {
    'help': help,
    'ban': ban
}

function help(msg){
    let args = msg.content.split(/\s+/).slice(1);

    let helpStr;
    if(args.length ==1){
        if(args[0].charAt(0) == config.prefix) //['L', 'efjofefe']
            args[0] = args[0].slice(1);
        helpStr = commandHelp[args[0]];
    }
    if(helpStr)
        msg.channel.send(helpStr, {
            'code': 'css'
        });
    else
        msg.channel.send(stripIndent(
            `
            [Help Menu]
                !pika help [command]
                
                #utility
                    !pika music
            [] = optionnel, <> = require, | = ou
            `), {
           'code': 'css'
        });
        
}

function ban(msg){
    if (!msg.member.hasPermission('BAN_MEMBERS')){
        return msg.channel.send(`Tu n'as pas accès à cette commande.`)
    }
    let memberToBan = msg.memtions.members.first();
    if(memberToBan && memberToBan.bannable && msg.member.highestRole.calculatedPosition >
            memberToBan.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)
        let reason = tool.parseOptionArg('raison', msg.content);
        let days = parseInt(tool.parseOptionArg('days', msg.content))

        let banOption = {
            days : days ? days : 0,
            reason: raison ? raison: 'none'
        };
        memberToBan.ban(banOption);
    
}