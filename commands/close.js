const Discord = require('discord.js');
const config = require('../config.json');
const log = require(`leekslazylogger`);
const sourcebin = require('sourcebin_js');
module.exports = {
  name: 'close',
  description: 'Close a ticket of User',
  usage: '@user',
  aliases: ['Done'],
  example: 'add @exampleUser',
  args: false,
  cooldown: config.cooldown,
  guildOnly: true,
  execute(client, message, args) {
    // Empieza el comado aca
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
    message.channel.messages.fetch().then(async (messages) => {
      const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

      let response;
      try {
        response = await sourcebin.create([
          {
            name: ' ',
            content: output,
            languageId: 'text',
          },
        ], {
          title: `Chat transcript for ${message.channel.name}`,
          description: ' ',
        });
      }
      catch(e) {
        return message.channel.send('An error occurred, please try again!');
      }

      const embed = new Discord.MessageEmbed()
        .setTitle("Ticket Closed")
        .addField("Username", message.author, true)
        .addField("Channel", message.channel.name, true)
        .addField("Transcript", `[\`📄 View\`](${response.url})`)
        .setColor('#e64b0e')
        .setTimestamp()
        .setFooter(`${config.NAME}`)
        client.channels.cache.get(config.LOGSCHANNELID).send({embed})
  })
    const embed9 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Hely Tickets")
    .setDescription('Are you sure? Once confirmed, you cannot reverse this action!\nTo close ticket, type \`!confirm\`. This will time out in 20 seconds and be cancelled.')
    .setFooter(`${config.NAME}`)
    .setTimestamp();
    message.channel.send({ embed: embed9 })
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '!confirm', {
        max: 1,
        time: 20000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 10000);
        });
  			log.info(`${message.author.tag} closed a ticket (#${message.channel.name})`)
      });
    }
  };