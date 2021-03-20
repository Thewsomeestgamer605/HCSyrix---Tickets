const Discord = require("discord.js");
const config = require('../config.json');
const client = new Discord.Client();

module.exports = {
  name: "suggest",
  aliases: [],
  description: "Submit a server suggestion to the suggestion channel",
  category: "Suggestions",
  usage: "<plugin> <suggestion>",
  args: true,
  cooldown: 5,
  execute(client, message, args) {

    const pluginQuery = args[0];
    const suggestionQuery = args.slice(1).join(" ");
    if (!suggestionQuery) return message.channel.send("<:x_:755873672954380298> | Please specify a suggestion! **`(You can add a single image)`**");
    if (!pluginQuery) return message.channel.send("<:x_:755873672954380298> | Please specify a plugin!");
    if (suggestionQuery.length > 2000) return message.channel.send("<:x_:755873672954380298> | Suggestion cannot exceed **`2000`** characters!");

    const channelSugg = client.channels.cache.get(config.SUGGESTIONCHANNELID);
    if (!channelSugg) return message.channel.send('<:x_:755873672954380298> | There is no established suggestion channel.');


    let imageDelete = message.attachments.first() ? message.attachments.first().url : null;
    const embedSuggest = new Discord.MessageEmbed()
      .setTitle("__**New Suggestion**__")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter("Hely Bot | Suggestions", client.user.displayAvatarURL())
      .setDescription(`**Plugin:**\n${pluginQuery}\n\n**Suggestion:**\n${suggestionQuery}`)
      .setImage(imageDelete)
      .setColor("#FF8000");

      message.delete();
    message.channel.send("<:check:755873671498956811> | Suggestion was sent successfully!").then(x => x.delete({ timeout: 9000 }));

    client.channels.cache.get(config.SUGGESTIONCHANNELID).send(embedSuggest);

  }
}