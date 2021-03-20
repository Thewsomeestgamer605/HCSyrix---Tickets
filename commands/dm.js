const Discord = require("discord.js");
const config = require('../config.json');
const client = new Discord.Client();

module.exports = {
    name: "dm",
    aliases: ["md"],
    description: "DM",
    category: "DM",
    usage: "<user> <message>",
    args: true,
    cooldown: 2,
    async execute(client, message, args, p) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            if(config.useEmbeds) {
              const notUse = new Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(`:x: **You do not have permission to use the __DM__ command**`)
                  .setTimestamp()
                  .setAuthor(message.author.tag, message.author.displayAvatarURL())
                  .setThumbnail('https://i.imgur.com/ThUnm8a.png')
                  .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
              return message.channel.send(notUse);
            } else {
              return message.channel.send(`:x: **You do not have permission to use the __DM__ command**`)
            }
        } 
        let dUser = message.mentions.users.first()
        if (!dUser) return message.channel.send("Can't find user!")
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't you that command!")
        let dMessage = args.slice(1).join(" ");
        if(dMessage.length < 1) return message.reply('You must supply a message!')
    
           const sucess = new Discord.MessageEmbed()
                  .setColor("GREEN")
                  .setTitle('Hely Message')
                  .addField(':white_check_mark: Message sent to', `${dUser}`, true)
                  .addField('Message', `${dMessage}`, true)
                  .setTimestamp()
                  .setThumbnail('https://i.imgur.com/ThUnm8a.png')
                  .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
              message.channel.send(sucess);
    
       const dmmessages = new Discord.MessageEmbed()
                  .setColor("GREEN")
                  .setTitle('Hely Message')
                  .addField('Member', `${dUser}`)
                  .addField('Message', `${dMessage}`)
                  .setTimestamp()
                  .setThumbnail('https://i.imgur.com/ThUnm8a.png')
                  .setFooter(`Hely Development`, 'https://i.imgur.com/ThUnm8a.png')
              dUser.send(dmmessages).catch(error => message.channel.send("<:x_:755873672954380298> | The author of the suggestion has closed DM's, so I cannot tell you that your suggestion was denied."));
    
    }
    };