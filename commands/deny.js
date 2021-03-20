const Discord = require("discord.js");
const config = require('../config.json');
const client = new Discord.Client();

module.exports = {
    name: "deny-suggestion",
    aliases: ["accept"],
    description: "Accept a server suggestion",
    category: "Suggestions",
    usage: "<message-suggest-ID> <reason>",
    args: true,
    cooldown: 2,
    async execute(client, message, args, p) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:x_:755873672954380298> | I'm sorry, but you don't have the `ADMINISTRATOR` permission to use that command.");
        const messageID = args[0];
        const acceptSuggestionQuery = args.slice(1).join(' ');

        const channelSugg = client.channels.cache.get(config.COLOURPANELMESSAGE);
        if (!channelSugg) return message.channel.send('<:x_:755873672954380298> | There is no established suggestion channel.');

        if (!messageID) return message.channel.send("<:x_:755873672954380298> | Enter the ID of a suggestion. **`(You can use " + p + "help accept)`**");

        try {
            const suggestionChannel = message.guild.channels.cache.get(config.COLOURPANELMESSAGE);
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            if (!suggestedEmbed) return message.channel.send("<:x_:755873672954380298> | Please enter a valid ID!")

            const data = suggestedEmbed.embeds[0];

            let images = data.image ? data.image.proxyURL : null;
            const acceptEmbed = new Discord.MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setTitle("__**Suggestion Denied**__")
                .setThumbnail(data.thumbnail.url)
                .setDescription(data.description)
                .setImage(images)
                .setColor("RED")
                .addField("Status (DENIED)", acceptSuggestionQuery || "Has no reason")
                .addField("Denied by", message.author)

            message.channel.send("<:check:755873671498956811> | Suggestion denied successfully!").then(x => x.delete({ timeout: 6000 }));
            suggestedEmbed.edit(acceptEmbed).catch(err => message.channel.send("<:x_:755873672954380298> | That message is not a suggestion `1`"));
            const user = client.users.cache.find((u) => u.tag === data.author.name);
            user.send(`<:x_:755873672954380298> | Your suggestion has been denied by: **\`${message.author.tag}\`**\n**\`Reason: ${acceptSuggestionQuery || "Has no reason"}\`**!`).catch(error => message.channel.send("<:x_:755873672954380298> | The author of the suggestion has closed DM's, so I cannot tell you that your suggestion was denied."));
        } catch (err) {
            message.channel.send("<:x_:755873672954380298> | That message is not a suggestion `2`")
        };
    }
}