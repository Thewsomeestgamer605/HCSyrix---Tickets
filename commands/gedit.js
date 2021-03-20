const config = require('../config.json');
module.exports = {
    name: "gedit",
    aliases: ["edit"],
    description: "Edit Giveaways",
    category: "Giveaways",
    usage: "<GiveawayID> <prize-winners> <new-prize-or-winners",
    args: true,
    cooldown: 2,
    async execute(client, message, args) {

    if(!message.member.roles.cache.some((r) => r.name === config.GIVEAWAYROLE)){
        return message.channel.send(`:x: You need to have the ${config.GIVEAWAYROLE} role to do that.`);
    }

    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    if(!args[1]){
        return message.channel.send(':x: You need to either edit the prize or the winners!');
    }

    if(args[1] === 'prize'){
        let newPrize = args.slice(2).join(' ')

        if(!newPrize) return message.channel.send(':x: You have to provide a new prize!');

        client.giveawaysManager.edit(args[0], {
            newPrize: newPrize,
        }).then(() => {
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('✅ The giveaway prize will updated in less than ' + numberOfSecondsMax + ' seconds.');
        }).catch((err) => {
            message.channel.send(`:x: No giveaway found for \`${args[0]}\`, please check you have the right message and try again.`);
        });
    }else
    if(args[1] === 'winners'){
        let newWinners = args[2]
        if(isNaN(newWinners) || (parseInt(newWinners) <= 0)){
            return message.channel.send(':x: You have to specify a valid number of winners!');
        }

        client.giveawaysManager.edit(args[0], {
            newWinnerCount: newWinners,
        }).then(() => {
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('✅ The giveaway winner count will updated in less than ' + numberOfSecondsMax + ' seconds.');
        }).catch((err) => {
            message.channel.send(`:x: No giveaway found for \`${args[0]}\`, please check you have the right message and try again.`);
        });
    }else{
        return message.channel.send(':x: You need to either edit the prize or the winners!');
    }
}};