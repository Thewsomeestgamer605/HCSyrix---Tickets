const ms = require('ms');
const config = require('../config.json');

module.exports = {
    name: "gcreate",
    aliases: ["create"],
    description: "Create Giveaways",
    category: "Giveaways",
    usage: "",
    cooldown: 2,
    async execute(client, message, args) {
    let giveawayChannel = ''
    let giveawayDuration = ''
    let giveawayNumberWinners = ''
    let giveawayPrize = ''
    let status = ''

    if(!message.member.roles.cache.some((r) => r.name === config.GIVEAWAYROLE)){
        return message.channel.send(`:x: You need to have the ${config.GIVEAWAYROLE} role to do that.`);
    }

    async function part1(){
        await message.channel.send(`>>> ${config.GIVEAWAYEMOJI} Please mention the channel that the giveaway should be in.\nEnter \`cancel\` to cancel.`)
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('**Command Canceled**')
                status = 1
                return
            }else{
                giveawayChannel = collected.first().mentions.channels.first()
            if(!giveawayChannel){
                message.reply('No channel was mentioned\nPlease try the command again.')
                status = 1
            }}
        }).catch(() => {
            message.reply('No answer after 30 minutes, please try the command again.');
            status = 1
    })
    }

    async function part2(){
        await message.channel.send(`>>> ${config.GIVEAWAYEMOJI} How long should the giveaway last?\nEnter \`cancel\` to cancel.`)
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('**Command Canceled**')
                status = 1
                return
            }else
            if(isNaN(ms(collected.first().content.toLowerCase()))){
                message.channel.send(':x: You have to specify a valid duration!');
                status = 1
                return
            }else{
                giveawayDuration = collected.first().content
            }
        }).catch(() => {
            message.reply('No answer after 30 minutes, please try the command again.');
            status = 1
    })
    }

    async function part3(){
        await message.channel.send(`>>> ${config.GIVEAWAYEMOJI} How many winners should there be?\n**Max 10**\nEnter \`cancel\` to cancel.`)
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('**Command Canceled**')
                status = 1
                return
            }else
            if(isNaN(collected.first().content.toLowerCase()) || (parseInt(collected.first().content.toLowerCase()) <= 0)){
                message.channel.send(':x: You have to specify a valid number of winners!');
                status = 1
                return
            }else 
            if(collected.first().content.toLowerCase() > 10){
                message.channel.send(':x: You must have less than 10 winners!');
                status = 1
                return
            }else{
                giveawayNumberWinners = collected.first().content
            }
        }).catch(() => {
            message.reply('No answer after 30 minutes, please try the command again.');
            status = 1
    })
    }

    async function part4(){
        await message.channel.send(`>>> ${config.GIVEAWAYEMOJI} What should the giveaway prize be?\nEnter \`cancel\` to cancel.`)
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
        {max: 1, time: 1800000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'cancel') {
                message.channel.send('**Command Canceled**')
                status = 1
                return
            }else{
                giveawayPrize = collected.first().content
            }
        }).catch(() => {
            message.reply('No answer after 30 minutes, please try the command again.');
            status = 1
    })
    }

    async function part5(){
        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayNumberWinners,
            hostedBy: config.hostedBy ? message.author : null,
            messages: {
                giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+ config.GIVEAWAYEMOJI + " **GIVEAWAY** " + config.GIVEAWAYEMOJI,
                giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+ config.GIVEAWAYEMOJI + "** GIVEAWAY ENDED **" + config.GIVEAWAYEMOJI,
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with " + config.GIVEAWAYEMOJI + " to participate!",
                winMessage: config.GIVEAWAYEMOJI + ` {winners} won **{prize}**! Congratulations!\n{messageURL}`,
                embedFooter: 'End at',
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

        message.channel.send(`${config.GIVEAWAYEMOJI} Giveaway started in <#${giveawayChannel.id}>`);
    }

    async function main(){
        await part1()
        if(status) return
        await part2()
        if(status) return
        await part3()
        if(status) return
        await part4()
        if(status) return
        await part5()
        }

        main()

}};