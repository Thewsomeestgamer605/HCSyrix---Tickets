const config = require('../config.json');
module.exports = {
    name: "glist",
    aliases: ["list"],
    description: "List Giveaways",
    category: "Giveaways",
    usage: "",
    cooldown: 2,
    async execute(client, message, args) {

    const Discord = require("discord.js");
    let giveaways = []
    const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
    const giveaways2 = giveaways1.filter((g) => !g.ended)
    const giveaways3 = giveaways2.forEach((thisGiveaway)=>{
        let winners = ''
        if(thisGiveaway.winnerCount == 1){
            winners = 'winner'
        }else{
            winners = 'winners'
        }
        giveaways.push(`\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`)
    })
    const embed = new Discord.MessageEmbed()
    .setColor(config.EMBEDCOLOR)
    .setTitle('Current Giveaways')
    .setDescription(giveaways.join('\n') || 'No giveaways are currently running')
    message.channel.send(embed)

}};