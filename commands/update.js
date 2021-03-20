const Discord = require("discord.js");
const config = require('../config.json');
const client = new Discord.Client();

module.exports = {
  name: "update",
  aliases: [],
  description: "Submit a server suggestion to the suggestion channel",
  category: "Suggestions",
  usage: "<update>",
  args: true,
  cooldown: 5,
  execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:x_:755873672954380298> | I'm sorry, but you don't have the `ADMINISTRATOR` permission to use that command.");

    const suggestionQuery = args.slice(0).join(' ');
    if (!suggestionQuery) return message.channel.send("<:x_:755873672954380298> | Please specify a update! **`(You can add a single image)`**");
    if (suggestionQuery.length > 2000) return message.channel.send("<:x_:755873672954380298> | Suggestion cannot exceed **`2000`** characters!");



    let imageDelete = message.attachments.first() ? message.attachments.first().url : null;
    const embedSuggest = new Discord.MessageEmbed()
      .setTitle("__**Updates**__")
      .setThumbnail("https://i.imgur.com/ThUnm8a.png")
      .setFooter("Hely Bot | Update", client.user.displayAvatarURL())
      .setDescription(`${suggestionQuery}`)
      .setImage(imageDelete)
      .setColor("GREEN");

      message.delete();

    message.channel.send(embedSuggest);

  }
}