 const Discord = require('discord.js');
const date = require('date-and-time')
const config = require('../config.json');

module.exports = {
    name: "timer",
    aliases: ["timerticket"],
    description: "Timer ticket",
    category: "Ticket",
    usage: "",
    cooldown: 2,
    async execute(client, message, args, p) {

    let notallowed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setDescription(`You Need The **Support Team** Role To Start Ticket Timeouts`)

    if(!message.member.roles.cache.some(r => r.name == 'Support')) return message.channel.send(notallowed)

  let cancelembed = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle(`Timeout Stopped`)
  .setDescription(`A person reacts, the ticket will not be closed`)
  .setFooter(`${config.NAME}`)
  .setTimestamp();

  let input = new Discord.MessageEmbed()
  .setColor('#e64b0e')
  .setTitle("Timeout Started")
  .setDescription(`This ticket will close in 15 Minutes if no one reacts to this message`)
  .setFooter(`${config.NAME}`)
  .setTimestamp();

  let msg = await message.channel.send(input)
  await msg.react("✅")

  client.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot) return;
  })

    let closedticket = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    setTitle("Ticket Closed")
    .setDescription(`This ticket will be deleted in 10 Minutes`)
    .setFooter(`${config.NAME}`)
    .setTimestamp();
    

    let logchannelembed = new Discord.MessageEmbed()
    .setColor('#e64b0e')
    .setTitle(`Ticket Closed`)
    .setDescription(`Closed By: ${message.author}\n\nClose Reason: \`Timeout\`\nChannel: ${message.channel.name}`)
    .setTimestamp()
    .setFooter(`${config.NAME}`)

    let logchannel = client.channels.cache.get(config.LOGSCHANNELID);

  const filter = (reaction, user) => ['✅'].includes(reaction.emoji.name) && !user.bot;

  msg.awaitReactions(filter, {
    max: 1,
    time: 900000
  }).then(collected => {
    const reaction = collected.first();
    switch (reaction.emoji.name) {
      case '✅':
        msg.delete()
      return message.channel.send(cancelembed)
    }
  }).catch(collected => {
    logchannel.send(logchannelembed)  
    message.channel.send(closedticket)
    msg.delete()
    setTimeout(() => {
        message.channel.delete();
    }, 600000);
})
}
}