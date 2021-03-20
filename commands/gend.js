const ms = require('ms');
const config = require('../config.json');

module.exports = {
    name: "gend",
    aliases: ["end"],
    description: "End Giveaways",
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
        return message.channel.send(':x: Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })

    .then(() => {
        message.channel.send('✅ Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway has already ended!');
        } else {
            console.error(e);
            message.channel.send(':x: There was an error');
        }
    });

}};