const ms = require('ms');
const config = require('../config.json');

module.exports = {
    name: "greroll",
    aliases: ["reroll"],
    description: "Reroll Giveaways",
    category: "Giveaways",
    usage: "<GiveawayID>",
    args: true,
    cooldown: 2,
    async execute(client, message, args) {

    if(!message.member.roles.cache.some((r) => r.name === config.GIVEAWAYROLE)){
        return message.channel.send(`:x: You need to have the ${config.GIVEAWAYROLE} role to do that.`);
    }

    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        message.channel.send(`:x: No giveaway found for \`${messageID}\`, please check you have the right message and try again.`);
    }

    client.giveawaysManager.reroll(giveaway.messageID, {
        messages: {
            congrat: config.GIVEAWAYEMOJI + ` New winner(s): {winners}! Congratulations!\n{messageURL}`
        }
    })
    .then(() => {
        message.channel.send('✅ Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send(':x: There was an error');
        }
    });
}}
