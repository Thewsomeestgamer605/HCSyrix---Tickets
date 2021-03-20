const Discord = require("discord.js");
const config = require('../config.json');
const client = new Discord.Client();

module.exports = {
    name: "rename",
    aliases: ["renameticket"],
    description: "Rename ticket",
    category: "Ticket",
    usage: "<name>",
    args: true,
    cooldown: 2,
    async execute(client, message, args, p) {
        if(!message.channel.name.startsWith('ticket-')) {
            if(config.useEmbeds) {
              const notTicket = new Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(`:x: **This command can only be used within a ticket channel**`)
              return message.channel.send(notTicket);
            } else {
              return message.channel.send(`:x: **This command can only be used within a ticket channel**`)
            }
          }
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:x_:755873672954380298> | I'm sorry, but you don't have the `ADMINISTRATOR` permission to use that command.");
        const name = args.slice(0).join(' ');

        if (!name) return message.channel.send("<:x_:755873672954380298> | Enter the name of the ticket");
 
        message.channel.setName(args.slice(0).join(' '))

        message.channel.send("<:check:755873671498956811> | Ticket renamed successfully!").then(x => x.delete({ timeout: 10000 }));
    }
}