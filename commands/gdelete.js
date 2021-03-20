const ms = require('ms');
const config = require('../config.json');

module.exports = {
    name: "gdelete",
    aliases: ["create"],
    description: "Delete Giveaways",
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

    let messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send("✅ Giveaway deleted!");
        }).catch((err) => {
            message.channel.send(":x: No giveaway found for \`${messageID}\`, please check you have the right message and try again.");
        });

}};